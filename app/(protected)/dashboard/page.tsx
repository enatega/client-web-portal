import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export default function Dashboard() {
  return (
    <div className="card flex justify-content-center">
      <Button>Add</Button>

      <Card>
        <p>Some text</p>
      </Card>
    </div>
  );
}
