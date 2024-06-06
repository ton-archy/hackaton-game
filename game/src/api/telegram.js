const mockFunc = (...args) => console.log(args);

export const getTelegramApi = () => {
  if (window?.Telegram?.WebApp?.initData != "") {
    return window.Telegram.WebApp;
  } else {
    return {
      initData: 'query_id=AAGdp14MAAAAAJ2nXgyrs727&user=%7B%22id%22%3A207529885%2C%22first_name%22%3A%22Kirill%22%2C%22last_name%22%3A%22Sidorov%22%2C%22username%22%3A%22sidorovkv%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1715742794&hash=879fea402de085bf7aa7caef76f6fe69d44083be9cbd83835534a5c473fe9f32',
      setHeaderColor: mockFunc,
      expand: mockFunc,
      ready: mockFunc,
      close: mockFunc,
      sendData: mockFunc,
      onEvent: mockFunc,
      offEvent: mockFunc,
      enableClosingConfirmation: mockFunc,
      disableClosingConfirmation: mockFunc,
      SettingsButton: {
        onClick: mockFunc,
        offClick: mockFunc,
        show: mockFunc
      }
    }
  }
}




