import React from "react";
import { Heart } from "lucide-react";
import ModalWrapper from "./ModalWrapper";

export default function Notifications({ onClose, isAuthenticated, messages = [] }) {
  return (
    <ModalWrapper onClose={onClose}>
      <div className="text-center px-10 space-y-4 mt-4">
        <div className="flex justify-center">
          <div className="p-4 border border-white rounded-full">
            <Heart className="w-8 h-8 text-white" />
          </div>
        </div>

        {isAuthenticated ? (
          <>
            <h2 className="text-lg text-white font-bold">
              {messages.length > 0 ? "Notifications" : "You have 0 notifications!"}
            </h2>
            {messages.length > 0 ? (
              <ul className="text-sm text-white space-y-2">
                {messages.map((msg, i) => (
                  <li key={i}>• {msg}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-white">New announcements will appear here.</p>
            )}
          </>
        ) : (
          <>
            <h2 className="text-lg text-white font-bold">Please sign in</h2>
            <p className="text-sm text-white">Sign in to view your notifications.</p>
          </>
        )}
      </div>
    </ModalWrapper>
  );
}
