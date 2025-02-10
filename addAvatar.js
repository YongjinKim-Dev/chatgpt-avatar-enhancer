// addAvatar.js
// 순수 함수: DOM 요소에 아바타 이미지를 prepend하는 로직
// chrome.storage 접근 대신, getAvatarUrl 콜백 함수로 아바타 URL을 주입받아 테스트 용이성 확보

async function addAvatar(messageEl, type, getAvatarUrl) {
  // 이미 아바타가 있다면 중복 삽입하지 않음
  if (messageEl.querySelector(".chat-avatar")) {
    return;
  }

  let avatarUrl = await getAvatarUrl(type);
  if (!avatarUrl) {
    avatarUrl = "img/placeholder.png"; // 기본 이미지 (실제 파일은 없을 수도 있음)
  }

  const img = document.createElement("img");
  img.src = avatarUrl;
  img.classList.add("chat-avatar");

  messageEl.prepend(img);
}

module.exports = addAvatar;

