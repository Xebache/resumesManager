using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PRID_Framework;
using prid_2122_f02.Models;
using prid_2122_f02.Helpers;

namespace prid_2122_f02.Controllers {

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase {


        private readonly Context _context;
        private readonly IMapper _mapper;


        public UsersController(Context context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }


        [Authorized(Role.Admin)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAll() {
            return _mapper.Map<List<UserDTO>>(await _context.Users.ToListAsync());
        }


        [HttpGet("{pseudo}")]
        public async Task<ActionResult<UserDTO>> GetOne(string pseudo) {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Pseudo == pseudo);

            if (user == null)
                return NotFound();
            return _mapper.Map<UserDTO>(user);
        }


        [HttpPost]
        public async Task<ActionResult<UserDTO>> PostMember(UserWithPasswordDTO dto) {
            var newUser = _mapper.Map<User>(dto);

            _context.Users.Add(newUser);

            var res = await _context.SaveChangesAsyncWithValidation();
            if (!res.IsEmpty)
                return BadRequest(res);

            return CreatedAtAction(nameof(GetOne), new { pseudo = dto.Pseudo }, _mapper.Map<UserDTO>(newUser));
        }


        [Authorized(Role.Admin)]
        [HttpPut]
        public async Task<IActionResult> PutMember(UserWithPasswordDTO dto) {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Pseudo == dto.Pseudo);

            if (user == null)
                return NotFound();

            if (string.IsNullOrEmpty(dto.Password))
                dto.Password = user.Password;

            _mapper.Map<UserDTO, User>(dto, user);

            var res = await _context.SaveChangesAsyncWithValidation();

            if (!res.IsEmpty)
                return BadRequest(res);
            return NoContent();
        }


        [Authorized(Role.Admin)]
        [HttpDelete("{pseudo}")]
        public async Task<IActionResult> DeleteMember(string pseudo) {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Pseudo == pseudo);

            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<ActionResult<User>> Authenticate(UserWithPasswordDTO dto) {
            var user = await Authenticate(dto.Pseudo, dto.Password);

            if (user == null) {
                return BadRequest(new ValidationErrors().Add("User not found", "Pseudo"));
            }
            if(user == null) {
                return BadRequest(new ValidationErrors().Add("Incorrect password", "Password"));
            }
            
            return Ok(_mapper.Map<UserDTO>(user));
        }


        private async Task<User> Authenticate(string pseudo, string password) {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Pseudo == pseudo);

            // return null if member not found
            if (user == null)
                return null;

            if (user.Password == password) {
                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("my-super-secret-key");
                var tokenDescriptor = new SecurityTokenDescriptor {
                    Subject = new ClaimsIdentity(new Claim[] {
                            new Claim(ClaimTypes.Name, user.Pseudo),
                            new Claim(ClaimTypes.Role, user.Role.ToString())
                        }),
                    IssuedAt = DateTime.UtcNow,
                    Expires = DateTime.UtcNow.AddMinutes(10),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                user.Token = tokenHandler.WriteToken(token);
            }

            return user;
        }

    }

}