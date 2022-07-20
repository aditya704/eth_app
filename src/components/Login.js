import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
function Login() {
  let navigate = useNavigate();
  return (
    <div>
      {/* <Button
        onSubmit={() => {
          navigate('/home');
        }}
      >Dashboard</Button>
      <Button variant="primary">Primary</Button>{' '} */}
    </div>
  );
}
export default Login;