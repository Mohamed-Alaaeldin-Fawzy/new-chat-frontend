import { User as UserType } from '@/types';
import User from './User';

const UserCheckbox = ({
  user,
  handleUserSelection,
}: {
  user: UserType;
  handleUserSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label className="relative m-4 flex items-center justify-center">
      <input
        type="checkbox"
        className="peer absolute h-full w-full opacity-0"
        onChange={handleUserSelection}
        value={user.id}
      />
      <div className="z-10 h-full w-full cursor-pointer rounded-2xl border peer-checked:bg-blue-500 peer-checked:text-white">
        <User name={user.name} email={user.email} />
      </div>
    </label>
  );
};

export default UserCheckbox;
