function signup()
{
    const name =
    document.getElementById(
        "signupName"
    ).value;

    const email =
    document.getElementById(
        "signupEmail"
    ).value;

    const password =
    document.getElementById(
        "signupPassword"
    ).value;

    if(
        !name ||
        !email ||
        !password
    )
    {
        alert(
            "Fill all fields"
        );
        return;
    }

    const user =
    {
        name,
        email,
        password
    };

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    alert(
        "Account Created"
    );

    window.location.href =
    "login.html";
}