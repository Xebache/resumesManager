using AutoMapper;

namespace prid_2122_f02.Models {

    public class MappingProfile : Profile {

        private Context _context;

        public MappingProfile(Context context) {
            _context = context;

            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>();

            CreateMap<User, UserWithPasswordDTO>();
            CreateMap<UserWithPasswordDTO, User>();
        }

    }

}