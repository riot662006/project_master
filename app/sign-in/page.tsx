"use client";

import { Google } from "@mui/icons-material";

export default function SignInPage() {
  return (
    <div className="signin-page">
      <div className="signin-card">
        <h2>Sign In</h2>
        <div className="form-container">
          <form className="email-signin-form">
            <input
              className="form-input"
              type="email"
              maxLength={320}
              placeholder="Email Address"
              required
            />
            <button className="submit-button" type="submit">
              Sign in with email
            </button>
          </form>

          <div className="divider">
            <div className="line"></div>
            <span className="or">or</span>
            <div className="line"></div>
          </div>

          <div className="social-logins">
            <button>
              <Google />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};