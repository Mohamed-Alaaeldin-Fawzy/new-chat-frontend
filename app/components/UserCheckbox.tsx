import { User as UserType } from '@/types';
import User from './User';

interface UserCheckboxProps {
  user: UserType;
  onUserSelectChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const UserCheckbox = ({ user, onUserSelectChange }: UserCheckboxProps) => {
  return (
    <label className="relative m-4 flex items-center justify-center">
      <input
        type="checkbox"
        className="peer absolute h-full w-full opacity-0"
        onChange={onUserSelectChange}
        value={user.id}
      />
      <div className="h-full w-full cursor-pointer rounded-2xl border peer-checked:bg-blue-500 peer-checked:text-white">
        <User name={user.name} email={user.email} />
      </div>
    </label>
  );
};

export default UserCheckbox;
