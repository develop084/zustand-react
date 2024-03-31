import create from "zustand";
interface IUser {
  username : string;
  email: string; 
  address: string;
}
export const useStore = create((set) => ({
  user: {
    username: "",
    email: "",
    address: "",
  },

  updateUser: (newUserData : IUser) =>
    set((state: any) => ({
      user: {
        ...state.user,
        ...newUserData,
      },
    })),
}));
