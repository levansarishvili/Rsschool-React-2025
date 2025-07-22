import './loader.css';

export default function Loader() {
  return (
    <div
      role="status"
      aria-label="Loading..."
      data-testid="loader"
      className="loader"
    />
  );
}
