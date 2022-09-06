<template>
  <section class="ftco-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-7 col-lg-5 col-xl-4">
          <div class="login-wrap">
            <div
              class="img d-flex align-items-center justify-content-center"
            ></div>
            <h3 class="text-center mb-0">Welcome</h3>
            <p class="text-center welcome-info">
              Sign in by entering the information below
            </p>
            <form action="#" class="login-form">
              <div class="form-group">
                <div
                  class="icon d-flex align-items-center justify-content-center"
                >
                  <span class="fa fa-user"></span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  required=""
                />
              </div>
              <div class="form-group">
                <div
                  class="icon d-flex align-items-center justify-content-center"
                >
                  <span class="fa fa-lock"></span>
                </div>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  required=""
                />
              </div>
              <div class="form-group d-md-flex">
                <div class="w-100 text-end p-2 forgot-msg">
                  <a href="#">Forgot Password</a>
                </div>
              </div>
              <div class="form-group">
                <button
                  type="submit"
                  class="btn form-control btn-primary rounded submit px-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
.welcome-info {
  margin-bottom: 20px;
}
.forgot-msg {
  margin-bottom: 20px;
}
.ftco-section {
  padding: 3em 0;
  text-decoration: none;
}
.ftco-section a {
  text-decoration: none;
  color: $lightGreen;
}

.ftco-no-pt {
  padding-top: 0;
}
.ftco-no-pb {
  padding-bottom: 0;
}
//HEADING SECTION
.heading-section {
  font-size: 28px;
  color: black;
}

//COVER BG
.img {
  background-size: cover;
  background-image: url("../../assets/m_logo_white.png");
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center center;
}

.login-wrap {
  position: relative;
  background: $darkPurple;
  border-radius: 5px;
  padding: 40px 40px 60px 40px;
  -webkit-box-shadow: 0px 10px 34px -15px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0px 10px 34px -15px rgba(0, 0, 0, 0.24);
  box-shadow: 0px 10px 34px -15px rgba(0, 0, 0, 0.24);
  h3 {
    font-weight: 400;
    font-size: 18px;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  p {
    color: rgba(255, 255, 255, 0.5);
  }
  .img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
    margin-bottom: 20px;
  }
}

.form-group {
  position: relative;
}

//FORM CONTROL
.form-control {
  height: 48px;
  background: rgb(242 111 255 / 10%);
  color: rgba(255, 255, 255, 0.8) !important;
  font-size: 14px;
  box-shadow: none;
  border-radius: 0;
  border: none;
  border-bottom: 2px solid $lightPurple;
  padding-left: 30px;
  margin-bottom: 10px;
  padding-right: 0;
  letter-spacing: 1px;
  &::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: rgba(255, 255, 255, 0.8) !important;
  }
  &::-moz-placeholder {
    /* Firefox 19+ */
    color: rgba(255, 255, 255, 0.8) !important;
  }
  &:-ms-input-placeholder {
    /* IE 10+ */
    color: rgba(255, 255, 255, 0.8) !important;
  }
  &:-moz-placeholder {
    /* Firefox 18- */
    color: rgba(255, 255, 255, 0.8) !important;
  }
  &:focus,
  &:active {
    outline: none !important;
    box-shadow: none;
    background: rgba(0, 0, 0, 0.07);
    border-color: $lightGreen;
  }
}

.text {
  a {
    text-transform: uppercase;
  }
}

//CHECKBOX STYLE
.checkbox-wrap {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  input:checked ~ .checkmark:after {
    display: block;
    content: "\f14a";
    color: rgba(0, 0, 0, 0.2);
  }
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "\f0c8";
  position: absolute;
  color: rgba(0, 0, 0, 0.1);
  font-size: 20px;
  margin-top: -4px;
}

/* Show the checkmark when checked */
.checkbox-primary {
  color: $lightPurple;
  input:checked ~ .checkmark:after {
    color: $lightPurple;
  }
}

//BUTTON
.btn {
  cursor: pointer;
  border-radius: 40px;
  box-shadow: none !important;
  font-size: 15px;
  &:hover,
  &:active,
  &:focus {
    outline: none;
  }
  &.btn-primary {
    background: $lightPurple !important;
    border: 1px solid $lightPurple !important;
    color: white !important;
    &:hover {
      color: $lightPurple;
      background: transparent;
    }
    &.btn-outline-primary {
      color: $lightPurple;
      background: transparent;

      &:hover {
        border: 1px solid transparent;
        color: white;
      }
    }
  }
}
</style>