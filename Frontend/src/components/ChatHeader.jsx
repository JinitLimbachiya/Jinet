import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div
    className="p-4 border-b border-base-300">
      <div
      className="flex items-center justify-between">
        
        <div
        className="flex items-center gap-3">

          {/* USER AVATAR */}
          <div
          className="avatar">

            <div
            className="size-10 rounded-full relative">
              <img
              src={selectedUser.profilePicture || "/DefaultAvatar.png"}
              alt={selectedUser.username}
              />
            </div>

          </div>

          {/* USER INFO */}
          <div>
            <h3
            className="font-medium">
                {selectedUser.username}
            </h3>

            <p
            className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>

        </div>

        {/* CHAT CLOSE BUTTON */}
        <button
        onClick={() => setSelectedUser(null)}>
          <X />
        </button>

      </div>
    </div>
  );
};
export default ChatHeader;