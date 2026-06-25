import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

export const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isonline = onlineUsers.includes(selectedUser._id.toString());

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilepic || "/avatar.png"} alt={selectedUser.fullname} />
            </div>
             {
                isonline && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                    rounded-full ring-1 ring-base-100"
                  />
                )
              }
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullname}</h3>
            <p className="text-sm text-base-content/70">
              {isonline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
