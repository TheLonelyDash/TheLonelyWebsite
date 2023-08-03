from flask import Flask, render_template, url_for, request, redirect 
import csv


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
    vids = read_csv()
    return render_template("pythonleetcode.html", vids = vids)

#Java LeetCode Page
@app.route("/javaleetcode")
def javaleetcode():
    vids = read_csv()
    return render_template("javaleetcode.html", vids = vids)

#JavaScript LeetCode Page
@app.route("/javascriptleetcode")
def javascriptleetcode():
    vids = read_csv()
    return render_template("javascriptleetcode.html", vids = vids)

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





####################### Read CSV FIle ######################

def read_csv():
        with open('static\VideosCSV.csv') as csv_file:
            data = csv.reader(csv_file, delimiter=',')
            first_line = True
            vids = []
            for row in data:
                if not first_line:
                    vids.append({
                        "number" : row[0],
                        "name" : row[1],
                        "link" : row[2],
                        "language" : row[3],
                        "embed" : row[4]
                    })
                else:
                    first_line = False
        return vids