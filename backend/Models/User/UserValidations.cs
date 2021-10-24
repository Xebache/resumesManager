using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace prid_2122_f02.Models {

    public class UserValidations {

        public static bool CheckPseudoUnicity(Context context, User user) {
            return context.Entry(user).State == EntityState.Modified || context.Users.AsNoTracking().Count(u => u.Pseudo == user.Pseudo && u.UserID != user.UserID) == 0;
        } 

        public static bool CheckPseudoFirstLetter(User user) {
            return Char.IsLetter(user.Pseudo.FirstOrDefault());
        }

        public static bool CheckEmailUnicity(Context context, User user) {
            return context.Entry(user).State == EntityState.Modified || context.Users.AsNoTracking().Count(u => u.Email == user.Email && u.UserID != user.UserID) == 0;
        }

        public static bool CheckNameComplete(User user) {
            if (!String.IsNullOrEmpty(user.Firstname))
                return !String.IsNullOrEmpty(user.Lastname);
            return String.IsNullOrEmpty(user.Lastname);
        }

        public static bool CheckNameLength(string name) {
            if (!String.IsNullOrEmpty(name))
                return name.Length > 3 && name.Length < 50;
            return true;
        }

        public static bool CheckOlder18(User user) {
            return user.Age.HasValue && user.Age >= 18;
        }

    }
    
}