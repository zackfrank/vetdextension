/* InboxSDK */

InboxSDK.load(2, 'sdk_vetdforwarding_bd72ae8268').then(function(sdk) {

  // the SDK has been loaded, now do something with it!
  sdk.Lists.registerThreadRowViewHandler(function(ThreadRowView) {

    ThreadRowView.addButton({
      title: "Vet'd Forwarding",
      iconUrl: 'https://getvetd.com/wp-content/uploads/2018/03/VetdLogo-Favicon.png',
      onClick: function(event) {
        sdk.Compose.openNewComposeView().then(function(composeView) {
        // a compose view has come into existence
          var subject = event.threadRowView.getSubject();
          var contacts = event.threadRowView.getContacts();
          var contact = contacts.length - 1;
          composeView.insertTextIntoBodyAtCursor("Sender Name: " + contacts[contact]["name"] + "\nSender Email Address: " + contacts[contact]["emailAddress"]);
          composeView.setToRecipients(["forward@getvetd.com"]);
          composeView.setSubject("Vet'd FWD: " + subject);
          setTimeout(function() {
            composeView.send(sendAndArchive = true);
            setTimeout(function() {
              sdk.Widgets.showModalView({
                el: "<h2>Email has been forwarded to Vet'd</h2>"
              });
            }, 0);
          }, 0);
        });
      }

    });

  });

});