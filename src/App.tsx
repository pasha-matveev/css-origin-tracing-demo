import { Card } from "./components/Card/Card";
import { Button } from "./components/Button/Button";
import "./styles/globals.css";

export default function App() {
  return (
    <div style={{ padding: "40px" }}>
      <Card variant="promo">
        <h2>CSS Origin Tracing Demo</h2>
        <p>This button consumes styles from three places:</p>
        <ul>
          <li>Global styles</li>
          <li>Card component styles</li>
          <li>Button component styles</li>
        </ul>
        <Button>Inspect Me</Button>
      </Card>
    </div>
  );
}