export default function Root() {
  function authorizeYandex() {
    const authUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=8c3ee706165741f0b0434e8ef1be2e87`;
    window.location.href = authUrl;
  }

  return (
    <>
      <button class="button" onClick={() => {authorizeYandex()}}>Authorize with Yandex</button>
    </>
  );
}
