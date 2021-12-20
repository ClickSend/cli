ClickSend Command Line Interface

THIS IS ALPHA SOFTWARE.  0.0.2 Branch

Installation

Using Git
> git clone https://github.com/ClickSend/cli.git
> cd cli
> git checkout 0.0.2
> npm install
> npm link

Using GH
(pending)

Using NPM
(pending)

Account Setup
> You will need your user name and account token from www.clicksend.com (expand this help)

Sending your first SMS:
clicksend sms send --csuser [your ClickSend user name] --cstoken [your ClickSend token] --to [recipient phone] --from [caller ID] --body "Your message" 

Notes:

You don't need to specify a "from" - if you don't, ClickSend will use a shared number.

You can add multiple recipients by separating numbers with spaces.

You can set environment variables for CLICKSEND_USER and CLICKSEND_TOKEN and then you won't need to specify them as command line options.