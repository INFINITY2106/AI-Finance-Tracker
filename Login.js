function login()
{
    const email =
    document.getElementById(
        "loginEmail"
    ).value;

    const password =
    document.getElementById(
        "loginPassword"
    ).value;

    const user =
    JSON.parse(
        localStorage.getItem(
            "user"
        )
    );

    if(
        user &&
        user.email === email &&
        user.password === password
    )
    {
        alert(
            "Login Successful"
        );

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        window.location.href =
        "index.html";
    }
    else
    {
        alert(
            "Invalid Credentials"
        );
    }
}