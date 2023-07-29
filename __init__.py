from flask import Flask, render_template, url_for, request, redirect 

app = Flask(__name__)

#Home Page
@app.route("/")
def home():
    return render_template("home.html")

#About Page
@app.route("/about")
def about():
    return render_template("about.html")

#About Topher Page
@app.route("/abouttopher")
def abouttopher():
    return render_template("abouttopher.html")

#Wordle Page
@app.route("/wordle")
def wordle():
    return render_template("wordle.html")

#Python LeetCode Page
@app.route("/pythonleetcode")
def pythonleetcode():
    return render_template("pythonleetcode.html")

#Java LeetCode Page
@app.route("/javaleetcode")
def javaleetcode():
    return render_template("javaleetcode.html")

#JavaScript LeetCode Page
@app.route("/javascriptleetcode")
def javascriptleetcode():
    return render_template("javascriptleetcode.html")

#Mini-Projects Page
@app.route("/miniprojects")
def miniprojects():
    return render_template("miniprojects.html")

#Contact Page
@app.route("/contact")
def contact():
    return render_template("contact.html")

#Apps Page
@app.route("/apps")
def apps():
    return render_template("apps.html")

#Paper,Rock, Scissors Page
@app.route("/paperrockscissors")
def paperrockscissors():
    return render_template("paperrockscissors.html")

#Terms Page
@app.route("/terms")
def terms():
    return render_template("terms.html")


#Privacy Policy Page
@app.route("/privacypolicy")
def privacypolicy():
    return render_template("privacypolicy.html")





####################### External Links ######################

#Routs to YouTube Channel
@app.route("/youtube")
def youtube():
    return redirect("https://www.youtube.com/@thelonelydash")

#Routs to Facebook Page
@app.route("/facebook")
def facebook():
    return redirect("https://www.facebook.com/profile.php?id=100084781395705")

#Routs to github page
@app.route("/github")
def github():
    return redirect("https://github.com/TheLonelyDash")

#Routs to linkedin profile
@app.route("/linkedin")
def linkedin():
    return redirect("https://www.linkedin.com/in/TopherShortt")

