// addAvatar.test.js
const addAvatar = require("./addAvatar");

describe("addAvatar function", () => {
  // 가짜 URL 함수
  const mockGetAvatarUrl = async (type) => {
    if (type === "user") {
      return "http://example.com/user.png";
    } else if (type === "assistant") {
      return "http://example.com/assistant.png";
    }
    return null;
  };

  beforeEach(() => {
    // 테스트 전마다 DOM 초기화
    document.body.innerHTML = "";
  });

  test("user 메시지에 user 아바타가 삽입되는지", async () => {
    const messageEl = document.createElement("div");
    messageEl.classList.add("message-item");

    await addAvatar(messageEl, "user", mockGetAvatarUrl);

    const avatar = messageEl.querySelector(".chat-avatar");
    expect(avatar).not.toBeNull();
    expect(avatar.tagName).toBe("IMG");
    expect(avatar.src).toBe("http://example.com/user.png");
  });

  test("이미 아바타가 존재하면 중복 삽입되지 않아야 함", async () => {
    const messageEl = document.createElement("div");
    messageEl.classList.add("message-item");
    const existing = document.createElement("img");
    existing.classList.add("chat-avatar");
    messageEl.appendChild(existing);

    await addAvatar(messageEl, "assistant", mockGetAvatarUrl);

    const avatars = messageEl.querySelectorAll(".chat-avatar");
    expect(avatars.length).toBe(1); // 여전히 하나여야 함
  });
});

