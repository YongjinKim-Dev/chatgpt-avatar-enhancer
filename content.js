// content.js
// ChatGPT DOM을 관찰하여 새 메시지 노드가 추가될 때 addAvatar 로직 호출

// 실제 코드에서는 addAvatar.js를 import or require 할 수 없으므로
// (Chrome 확장 content script는 ES 모듈 지원 / Webpack 등 번들링이 필요할 수 있음)
// 여기서는 예시로 작성 (직접 로직을 넣거나 ES 모듈 사용)

// 만약 ES 모듈 형태를 사용한다면:
// import addAvatar from './addAvatar.js';

async function getAvatarUrl(type) {
  // chrome.storage.local에서 userAvatar, assistantAvatar를 가져온 뒤
  // type에 따라 URL을 리턴
  return new Promise((resolve) => {
    chrome.storage.local.get(["userAvatar", "assistantAvatar"], (data) => {
      if (type === "user") {
        resolve(data.userAvatar);
      } else {
        resolve(data.assistantAvatar);
      }
    });
  });
}

function addAvatarDOM(messageEl, type) {
  messageEl.querySelector(".chat-avatar") || (async () => {
    let avatarUrl = await getAvatarUrl(type);
    if (!avatarUrl) {
      avatarUrl = "img/placeholder.png";
    }
    const img = document.createElement("img");
    img.src = avatarUrl;
    img.classList.add("chat-avatar");
    messageEl.prepend(img);
  })();
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // 실제 ChatGPT 구조에 맞춰 조건 변경해야 함
        if (node.matches(".user-message")) {
          addAvatarDOM(node, "user");
        } else if (node.matches(".assistant-message")) {
          addAvatarDOM(node, "assistant");
        }
      }
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // ChatGPT 메시지 컨테이너 (실제 클래스명은 구조 확인 필요)
  const chatContainer = document.querySelector(".chat-messages-container");
  if (chatContainer) {
    observer.observe(chatContainer, { childList: true, subtree: true });
  }
});

