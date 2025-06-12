import { BellIcon } from '@phosphor-icons/react';
import axios from '@/lib/axios';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Header() {
  const [userName, setUserName] = useState<string | null>();
  const [profilePicture, setProfilePicture] = useState<string>('');

  const fetchUserName = async () => {
    try {
      const response = await axios.get('/user/profile');
      console.log('Username:', response.data.user.userName);
      setUserName(response.data.user.userName);
      setProfilePicture(response.data.user.profilePicture);
    } catch {
      console.error('Error fetching user name');
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Good Morning, {userName} ☀️
        </h1>
        <p className="text-gray-600">Level 3: Sartorial Sorcerer ✨</p>
      </div>
      <div className="flex items-center space-x-2">
        <BellIcon className="w-6 h-6 text-gray-600" />
        <Avatar>
          <AvatarImage src={profilePicture} />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
