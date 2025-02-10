function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

document.getElementById("saveBtn").addEventListener("click", async () => {
  const userFile = document.getElementById("userAvatarInput").files[0];
  const assistantFile = document.getElementById("assistantAvatarInput").files[0];

  let userAvatar = null;
  let assistantAvatar = null;

  if (userFile) {
    userAvatar = await convertFileToBase64(userFile);
  }
  if (assistantFile) {
    assistantAvatar = await convertFileToBase64(assistantFile);
  }

  chrome.storage.local.set({
    userAvatar,
    assistantAvatar
  }, () => {
    alert("아바타가 저장되었습니다!");
  });
});

