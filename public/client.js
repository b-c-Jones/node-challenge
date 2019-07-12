require([
  'https://s3-us-west-1.amazonaws.com/patterns.esri.com/files/calcite-web/1.2.5/js/calcite-web.min.js',
  'esri/identity/OAuthInfo',
  'esri/identity/IdentityManager',
  'dojo/dom',
  'dojo/dom-construct',
  'dojo/on'
], function (calcite, OAuthInfo, esriID, dom, domConstruct, on) {
  calcite.init();

  const oAuthInfo = new OAuthInfo({
    appId: "pkA0skZI1sPjdepJ",
    popup: false
  });
  esriID.registerOAuthInfos([oAuthInfo]);

  esriID.checkSignInStatus(oAuthInfo.portalUrl + "/sharing").then(
    function () {
      let post = new XMLHttpRequest();
      post.open('POST', 'http://localhost:9000/OAuth', true);
      post.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      
      let info = oAuthInfo._oAuthCred;
      console.log(info);
      post.send(info);
    }
  ).otherwise(
    esriID.getCredential(oAuthInfo.portalUrl + "/sharing")
  );
  on(dom.byId("sign-out"), "click", function () {
    esriID.destroyCredentials();
    window.location.reload();
  });
  console.log(oAuthInfo);
});