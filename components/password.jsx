import { useId } from 'react';
import fudanLogo from '../assets/fudan_1.webp';

export default function PasswordField() {
  const passwordHintId = useId();
  const usernameHintId = useId();
  return (
    <>
    <div>
    <img 
        src={fudanLogo} 
        alt="fudan university" 
        style={{
          height: '100px', 
          maxHeight: '100px',
          width: '100px',
          marginRight: '0.5rem',
          padding: '2px'  // ÄÚ±ß¾à
        }}
      />
      </div>

      
      <div className='field'>
        <i className='fas fa-user'></i>
      <label>
        Username:
        <input
          type="text"
          aria-describedby={usernameHintId}
          placeholder='Enter your username'
        />
      </label>
      <h1 id={usernameHintId}>
      </h1>
      </div>

      <div className='field'>
        <i className='fas fa-lock'>
            <label>
                Password:
                <input
                    type="password"
                    aria-describedby={passwordHintId}
                    placeholder='at least 6 characters'
                />
            </label>
        </i>
      </div>
    </>
  );
}


// export default function App() {
//   return (
//     <>
//       <h2>Choose password</h2>
//       <PasswordField />
//       <h2>Confirm password</h2>
//       <PasswordField />
//     </>
//   );
// }
