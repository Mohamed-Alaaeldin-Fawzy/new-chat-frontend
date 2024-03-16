import { User as UserType } from '@/types';
import User from './User';

interface UserCheckboxProps {
  user: UserType;
  onUserSelectChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedUsers: string[];
}
const UserCheckbox = ({
  user,
  onUserSelectChange,
  selectedUsers,
}: UserCheckboxProps) => {
  return (
    <label className="relative my-4 flex items-center justify-center">
      <input
        type="checkbox"
        checked={selectedUsers.includes(user.id)}
        className="peer absolute h-full w-full cursor-pointer opacity-0"
        onChange={onUserSelectChange}
        value={user.id}
      />
      <div
        className={`h-full w-full rounded-2xl border ${selectedUsers.includes(user.id) && 'bg-blue-500 text-white'}`}
      >
        <User name={user.name} email={user.email} image={user.image} />
      </div>
    </label>
  );
};

export default UserCheckbox;
