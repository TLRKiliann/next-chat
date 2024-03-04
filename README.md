# next-chat

chat with special feature

# Install

`$ git clone ...`

`$ cd my-app`

`$ pnpm install`

# server-client

Server actions NextJS 14 with MySQL in LAN.

I've placed the query function files in the lib folder, as you can see, you can access :
- db.ts (configuration query to retrieve data or to make a CRUD with async functions from action.ts)
- actions.ts (action with (submit) form RCC)
- definitions.ts (types)

# Special features

1) Invite another user in a proposed room (question - confidential - info).

A window appears, allowing the user to select the room corresponding to the invitation.

Another window will be displayed to allow the invited user to answer yes or no.

If yes => users will be sent to the room together.

If no => users remain in the chat room.

3 Other chat rooms (programming - development - security) are available from anywhere in the application.

---

2) Send a message to another user.

The (session) user can send a message to another user by e-mail (by selecting an option).

A message box is available for viewing and deleting messages by sender.

# Additional libraries installed

- next-auth

`$ pnpm add next-auth`

- react-icons

`$ pnpm add react-icons`

- react-toastify

`$ pnpm add react-toastify`

- mysql2

`$ pnpm add mysql2`