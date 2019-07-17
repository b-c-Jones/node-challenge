require([
  'https://s3-us-west-1.amazonaws.com/patterns.esri.com/files/calcite-web/1.2.5/js/calcite-web.min.js',
  // 'esri/identity/OAuthInfo',
  // 'esri/identity/IdentityManager',
  'dojo/dom',
  'dojo/dom-construct',
  'dojo/on',
  'dojo/parser',
  'dijit/form/Form',
  'dijit/form/Button',
  'dijit/form/ValidationTextBox',
  'dijit/form/DateTextBox',
  'dijit/form/Select',
  'dijit/registry',
  'dgrid/Grid',
  'dgrid/Selection',
  'dgrid/extensions/ColumnHider',
  'dgrid/extensions/ColumnResizer',
  'dgrid/extensions/Pagination',
  'dstore/Memory'
], function (calcite,
  // OAuthInfo,
  // esriID,
  dom,
  domConstruct,
  on,
  parser,
  Form,
  Button,
  ValidationTextBox,
  DateTextBox,
  Select,
  registry,
  Grid,
  gridSelection,
  ColumnHider,
  ColumnResizer,
  Pagination,
  Memory) {
  calcite.init();
  var userItems;
  new Select({
    name:'when',
    options: [
      { label: 'Before', value: 'before' },
      { label: 'After', value: 'after' }
    ]
  }, 'whenSelect').startup();

  new DateTextBox({
    name: 'date',
    placeholder: 'mm/dd/yyyy'
  }, 'date').startup();

  on(dom.byId('testButton'), 'click', function() {
    var date = dom.byId('date').value;
    var when = registry.byId('whenSelect').value;
    var getItems = new XMLHttpRequest();
    getItems.onreadystatechange = function() {
      if (getItems.readyState === 4) {
        userItems = new Memory({data: getItems.response, idProperty: 'title'});
        var grid = new Grid({
          collection: userItems,
          columns: {
            title: "Item Title",
            id: "Item Id",
            created: "Date Created",
            type: "Item Type",
            tags: "Item Tags"
          }
        }, 'grid');
        grid.startup();
        console.log(userItems);
      };
    };
    getItems.open('POST', 'http://localhost:9000/get-data');
    getItems.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    getItems.send(`when=${when}&date=${date}`);
  });

  var columns = {
    id: 'Item Id',
    created: "Date Created",
    title: "Item Title",
    type: "Item Type",
    tags: "Item Tags"
  }
  // var esriToken;

  // const oAuthInfo = new OAuthInfo({
  //   appId: "pkA0skZI1sPjdepJ",
  //   popup: false
  // });
  // esriID.registerOAuthInfos([oAuthInfo]);

  // esriID.checkSignInStatus(oAuthInfo.portalUrl + "/sharing").then(
  //   function () {
  //     esriToken = oAuthInfo._oAuthCred.token;
  //     var post = new XMLHttpRequest();
  //     post.open("POST", 'http://localhost:9000/OAuth', true);
  //     post.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  //     post.send(`token=${esriToken}`);
  //   }
  // ).otherwise(
  //   esriID.getCredential(oAuthInfo.portalUrl + "/sharing")
  // );
  // on(dom.byId("sign-out"), "click", function () {
  //   esriID.destroyCredentials();
  //   window.location.reload();
  // });
  // console.log(oAuthInfo);
});
