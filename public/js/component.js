const COMPONENT = {
    preloader: `
        <!-- Preloader -->
        <div id="loader-wrapper">
            <div id="loader"></div>
            <div class="loader-section section-left"></div>
            <div class="loader-section section-right"></div>
        </div>`,
    navBar: `
        <!-- Nav bar -->
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper bg-000033">
                    <a href="../index.html" class="brand-logo">E-Teams</a>
                    <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li class="login"><a class="font-size-18" href="./todo.html">To-Do</a></li>
                        <li class="login"><a class="font-size-18 modal-trigger" href="#profile-modal">Profile</a></li>
                        <li class="login"><a class="font-size-18" href="./class.html">Class</a></li>
                        <li class="login"><a class="font-size-18" href="./discussion.html">Discussion</a></li>
                        <li class="login"><a class="font-size-18" href="./room.html">Room</a></li>
                        <li class="login"><a class="font-size-18" href="./learning_log.html">Learning Log</a></li>
                        <li class="login"><a class="font-size-18" href="./playground.html">Playground</a></li>
                        <li class="login"><a class="font-size-18 logout-btn" href="#">Logout</a></li>
                        <li class="logout"><a class="font-size-18 modal-trigger" href="#login-modal">Login</a></li>
                        <li class="logout"><a class="font-size-18 modal-trigger" href="#register-modal">Register</a></li>
                    </ul>
                </div>
            </nav>
        </div>`,
    sideNav: `
        <!-- Responsive side nav -->
        <ul class="sidenav bg-000033" id="mobile-demo">
            <li class="login"><a class="white-text font-size-18" href="./todo.html">To-Do</a></li>
            <li class="login"><a class="white-text font-size-18 modal-trigger" href="#profile-modal">Profile</a></li>
            <li class="login"><a class="white-text font-size-18" href="./class.html">Class</a></li>
            <li class="login"><a class="white-text font-size-18" href="./discussion.html">Discussion</a></li>
            <li class="login"><a class="white-text font-size-18" href="./room.html">Room</a></li>
            <li class="login"><a class="white-text font-size-18" href="./learning_log.html">Learning Log</a></li>
            <li class="login"><a class="white-text font-size-18" href="./playground.html">Playground</a></li>
            <li class="login"><a class="white-text font-size-18 logout-btn" href="#">Logout</a></li>
            <li class="logout"><a class="white-text font-size-18 modal-trigger" href="#login-modal">Login</a></li>
            <li class="logout"><a class="white-text font-size-18 modal-trigger" href="#register-modal">Register</a></li>
        </ul>`,
    description: `
        <!-- Description -->
        <div class="container">
            <div class="section">
                <div class="row">
                    <div class="logout col s12 m6">
                        <div class="card bg-2f3162">
                            <div class="card-content white-text height-140">
                                <span class="card-title">Login</span>
                                <p>Already have an account?</p>
                            </div>
                            <div class="card-action">
                                <a class="teal-text text-accent-3 modal-trigger" href="#login-modal">Login</a>
                            </div>
                        </div>
                    </div>
                    <div class="logout col s12 m6">
                        <div class="card bg-2f3162">
                            <div class="card-content white-text height-140">
                                <span class="card-title">Register</span>
                                <p>Don't have an account?</p>
                            </div>
                            <div class="card-action">
                                <a class="teal-text text-accent-3 modal-trigger" href="#register-modal">Register</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
    login: `
        <!-- Login form -->
        <div id="login-modal" class="modal bg-gradient-2">
            <div class="modal-content">
                <h4 class="center text-2f3162">Login</h4>
                <div class="row">
                    <form id="login" class="col s12">
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="email" type="email" class="validate">
                                <label for="email">Email</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="password" type="password" class="validate">
                                <label for="password">Password</label>
                            </div>
                        </div>
                        <button class="btn">Login</button>
                    </form>
                    <button class="btn" id="forgot-pw">Forgot password?</button>
                </div>
            </div>
        </div>`,
    register: `
        <!-- Register form -->
        <div id="register-modal" class="modal bg-gradient-2">
            <div class="modal-content">
                <h4 class="center text-2f3162">Register</h4>
                <div class="row">
                    <form id="register" class="col s12">
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="username" type="text" class="validate">
                                <label for="username">Username</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="email2" type="email" class="validate">
                                <label for="email2">Email</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="password2" type="password" class="validate">
                                <label for="password2">Password</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="pwconfirmation" type="password" class="validate">
                                <label for="pwconfirmation">Password Confirmation</label>
                            </div>
                        </div>
                        <button class="btn">Register</button>
                    </form>
                </div>
            </div>
        </div>`,
    profile: `
        <!-- Profile modal -->
        <div id="profile-modal" class="modal bg-gradient-2">
            <div class="modal-content row text-2f3162">
                <h4 class="center">Profile</h4>
                <div id="profile"></div><br>
                <button class="btn" id="del-btn">Delete account</button>
                <button class="btn" id="change-pw">Change password</button>
            </div>
        </div>`,
    contact: `
        <!-- Contact modal -->
        <div id="contact-modal" class="modal bg-gradient white-text">
            <div class="modal-content">
                <h4 class="center">Contact</h4>
                <div>
                    <h5>Facebook</h5>
                    <p><a class="white-text" target="_blank" href="https://www.facebook.com/profile.php?id=100009400054425">Nguyen Minh Duc</a></p>
                    <p><a class="white-text" target="_blank" href="https://www.facebook.com/profile.php?id=100020316580655">To Thien Bao</a>
                    </p>
                </div><br>
                <div>
                    <h5>Phone number</h5>
                    <p>Nguyen Minh Duc: 0981062376</p>
                    <p>To Thien Bao: 0888245645</p>
                </div><br>
                <div>
                    <h5>Email</h5>
                    <p>Nguyen Minh Duc: ngmductm@gmail.com</p>
                    <p>To Thien Bao: tothienbao6a0@gmail.com</p>
                </div><br>
                <div>
                    <h5>Discord</h5>
                    <p>Nguyen Minh Duc: The Master#3287</p>
                    <p>To Thien Bao: SushiIceCream#5106</p>
                </div><br>
                <div>
                    <h5>Instagram</h5>
                    <p>Nguyen Minh Duc: ngnmduc</p>
                    <p>To Thien Bao: bao_to1</p>
                </div>
            </div>
        </div>`,
    footer: `
        <!-- Footer -->
        <footer class="page-footer bg-000033">
            <div class="container">
                <div class="row">
                    <div class="col l6 s12">
                        <h5 class="white-text">About</h5>
                        <p class="white-text about">Revolutionizing the tech industry - one step at a time. And E-Teams is exactly
                            what you need. Discussion posts, learning logs, real-time virtual meeting, and much more. Jump
                            onto our site, register for an account, and enjoy the benefit of this professional platform today!</p>
                        <p class="white-text about">Third Prize MindX Grand Hackathon</p>
                    </div>
                    <div class="col l4 offset-l2 s12">
                        <h5 class="white-text">Contact</h5>
                        <ul>
                            <li class="white-text about">Whether you have a question about information, demo or anything
                                else, our team is ready and happy to answer all your questions</li><br>
                            <li><a class="white-text modal-trigger" href="#contact-modal">Contact</a></li>
                            <li><a class="white-text" href="./our_team.html">Our Team</a></li>
                            <li><a class="white-text" href="./user_guide.html">User Guide</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <div class="container" id="cpr">
                    <p>Favicon was designed by To Thien Bao</p>
                    Copyright &#169;
                </div>
            </div>
        </footer>`
}

$("#body").before(COMPONENT.preloader)
setTimeout(() => {
    $("body").addClass("loaded")
}, 3000)

$("#body").before(COMPONENT.navBar)
$("#body").before(COMPONENT.sideNav)
$("#body").append(COMPONENT.description)
$("#body").append(COMPONENT.login)
$("#body").append(COMPONENT.register)
$("#body").append(COMPONENT.profile)
$("#body").after(COMPONENT.contact)
$("#body").after(COMPONENT.footer)