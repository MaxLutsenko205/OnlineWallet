export function Footer() {
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-500 py-4 mt-8 rounded-t-2xl shadow-inner">
      <p>OnlineWallet © {new Date().getFullYear()}</p>
    </footer>
  );
}