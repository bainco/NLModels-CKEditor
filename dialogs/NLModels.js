/**
 * NetLogo Web Models Library Plugin
 * @license Copyright (c) 2020, CT-STEM. All rights reserved.
 * @author Connor Bain
 */

/**
 * @WARNING, if the naming / organization method at the below ever changes, these
 * functions would need to be modified, as would the CONSTANTS above.
 * @reference https://github.com/NetLogo/Galapagos/blob/master/app/assets/javascripts/models.coffee
 *
 * These are current as of 12/3/2020 -- CPB
 *
 * Example URL for iframe src:
 * https://netlogoweb.org/web?https://netlogoweb.org/assets/modelslib/Curricular%20Models/Connected%20Chemistry/Connected%20Chemistry%20Gas%20Combustion.nlogo
 */
var NETLOGOWEB_SITE = "https://netlogoweb.org"
var MODEL_JSON_PATH = "/model/list.json"
var MODEL_STATUSES_JSON_PATH = "/model/statuses.json"
var NLW_QUERY_SELECTOR = "/web?"
var NLW_MODEL_ASSET_PATH = "/assets/modelslib/"

var NLW_MODEL_PATH_FULL = "public/modelslib/"

// Define the dialog
CKEDITOR.dialog.add( 'NLModelsDialog', function( editor ) {
  return {
    title: 'NetLogo Models Library',
    minWidth: 600,
    minHeight: 200,
    // Manually override button appearance
    buttons: [
      CKEDITOR.dialog.cancelButton.override( {} ),
      CKEDITOR.dialog.okButton.override( { label : 'Insert Model', disabled: false} ),
    ],
    // Dialog window content definition.
    contents: [
      {
        // Definition of the tab (page).
        id: 'nlw-tab',
        label: 'NetLogo Models Library',
        // The tab content.
        elements: [
          {
            // Select element to pick the model to preview
            type: 'html',
            html: '<style>input[id="nlw-picker"] { height:50px; width:100%; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAACYktHRAD/h4/MvwAAAAl2cEFnAAABKgAAASkAUBZlMQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMy0wNC0xMFQwNjo1OTowNy0wNzowMI5BiVEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTMtMDQtMTBUMDY6NTk6MDctMDc6MDD/HDHtAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAABF0RVh0VGl0bGUAc2VhcmNoLWljb27Cg+x9AAACKklEQVQ4T6WUSavqQBCFK+2sII7gShFXLpUsBBHFf+1KcAQFwaWiolsnnBDn++4p0iHRqPDuByFJd/Wp6qrqVn5+IQP3+52m0ymtVis6Ho885na7KRgMUiKR4O9vmEQHgwGNx2NyOp0khCBFUXgcJo/Hg67XK8ViMcpkMjz+Dl200+nQZrMhh8PBE4gYQgDidrudvzEOm2KxyP9WsCginM1mHKEUS6VSFA6HOWI4G41GPAfx2+1GgUCAVFXVZMwovwY/lUqFPB4PiyFn+XxemzbT6/VovV6z8Ol0olwux+LPCBQFEQKIvhME2WyWbWGHFCD/VghUGVvE1rDlb6TTabbFmuVyqY2aEWgbFALeI5GINvyeUCjEtlgju+IZoRWfkS30CURoxFJUNjMEt9stf38CNjJKIFvNiMBJgTebzcZt843hcMhCELWqPBDxeJwulwtvC/3X7/e1qVfgFD0rC5tMJrUZM8Lr9VI0GmVBRDCfz6nZbHI/Sna7HXW7XZpMJtxSiBIP1lmhH9NqtaqfGKQDTmQREBnSgwfmMqfYYblc1o+2xHShtNttLgSiee4EmMEp3hDBPJzikimVSuRyuTTLJ1GwWCz4pCB3UhiL/X4/Hw50C5zjLSM+n898weCogxdRIzAGxigAdtNqtV6EC4UC+Xy+z6Kf2O/31Gg0TMK4ZBDxf4uCw+FA9XpdF0aaUOg/iQLcHbVaTb/p0Cl/FgXIJ/oYnaCqKv0DC6dltH6Ks84AAAAASUVORK5CYII=); background-position: 10px 10px; background-repeat: no-repeat;padding-left: 40px; box-sizing: border-box; border: 2px solid #ccc; border-radius: 4px;} input[id="nlw-picker"]:focus { border: 3px solid #555;}</style> <input id="nlw-picker" list="nlw-models-list" placeholder="-- select a model to preview --"><datalist id="nlw-models-list"></datalist> ',
          },
          {
            // iframe element we use to load the model into
            type: 'iframe',
            id: 'nlw-preview',
            src: ''
          }
        ]
      },
      {
        // Definition of the tab (page).
        id: 'nt-tab',
        label: 'NetTango Models Library',
        // The tab content.
        elements: [
          {
            // Select element to pick the model to preview
            type: 'html',
            html: '<style>input[id="nt-picker"] { height:50px; width:100%; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAACYktHRAD/h4/MvwAAAAl2cEFnAAABKgAAASkAUBZlMQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMy0wNC0xMFQwNjo1OTowNy0wNzowMI5BiVEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTMtMDQtMTBUMDY6NTk6MDctMDc6MDD/HDHtAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAABF0RVh0VGl0bGUAc2VhcmNoLWljb27Cg+x9AAACKklEQVQ4T6WUSavqQBCFK+2sII7gShFXLpUsBBHFf+1KcAQFwaWiolsnnBDn++4p0iHRqPDuByFJd/Wp6qrqVn5+IQP3+52m0ymtVis6Ho885na7KRgMUiKR4O9vmEQHgwGNx2NyOp0khCBFUXgcJo/Hg67XK8ViMcpkMjz+Dl200+nQZrMhh8PBE4gYQgDidrudvzEOm2KxyP9WsCginM1mHKEUS6VSFA6HOWI4G41GPAfx2+1GgUCAVFXVZMwovwY/lUqFPB4PiyFn+XxemzbT6/VovV6z8Ol0olwux+LPCBQFEQKIvhME2WyWbWGHFCD/VghUGVvE1rDlb6TTabbFmuVyqY2aEWgbFALeI5GINvyeUCjEtlgju+IZoRWfkS30CURoxFJUNjMEt9stf38CNjJKIFvNiMBJgTebzcZt843hcMhCELWqPBDxeJwulwtvC/3X7/e1qVfgFD0rC5tMJrUZM8Lr9VI0GmVBRDCfz6nZbHI/Sna7HXW7XZpMJtxSiBIP1lmhH9NqtaqfGKQDTmQREBnSgwfmMqfYYblc1o+2xHShtNttLgSiee4EmMEp3hDBPJzikimVSuRyuTTLJ1GwWCz4pCB3UhiL/X4/Hw50C5zjLSM+n898weCogxdRIzAGxigAdtNqtV6EC4UC+Xy+z6Kf2O/31Gg0TMK4ZBDxf4uCw+FA9XpdF0aaUOg/iQLcHbVaTb/p0Cl/FgXIJ/oYnaCqKv0DC6dltH6Ks84AAAAASUVORK5CYII=); background-position: 10px 10px; background-repeat: no-repeat;padding-left: 40px; box-sizing: border-box; border: 2px solid #ccc; border-radius: 4px;} input[id="nt-picker"]:focus { border: 3px solid #555;}</style> <input id="nt-picker" list="nt-models-list" placeholder="-- select a model to preview --"><datalist id="nt-models-list"></datalist> ',
          },
          {
            // iframe element we use to load the model into
            type: 'iframe',
            id: 'nt-preview',
            src: ''
          }
        ]
      }
    ],

    onLoad: function() {

      var dialog = this;
      // Fetch the NLW Models Library resources we need
      var modelJSON = CKEDITOR.ajax.load( NETLOGOWEB_SITE + MODEL_JSON_PATH, function( modelJSON ) {
        var modelNames = JSON.parse(modelJSON)
        var statusesJSON = CKEDITOR.ajax.load( NETLOGOWEB_SITE + MODEL_STATUSES_JSON_PATH, function( statusesJSON ) {
          var modelStatuses = JSON.parse(statusesJSON);
          // Go through the models and get rid of any that don't compile on NLW
          for ( model of modelNames ) {
            if (modelStatuses[model].status != "not_compiling") {
              var option = document.createElement('option');
              option.value = model.substring(NLW_MODEL_PATH_FULL.length, model.length);
              document.getElementById('nlw-models-list').appendChild(option);
            }
          }
        });
      });

      document.getElementById('nlw-picker').addEventListener('change', function() {
        dialog.getContentElement('nlw-tab', 'nlw-preview').getElement().setAttribute('src', NETLOGOWEB_SITE + NLW_QUERY_SELECTOR + NETLOGOWEB_SITE + NLW_MODEL_ASSET_PATH + document.getElementById('nlw-picker').value + ".nlogo");
      });

      // Fetch the NLW Models Library resources we need
      var NTmodelJSON = CKEDITOR.ajax.load("https://raw.githubusercontent.com/NetLogo/nt-models/main/library.json", function( NTmodelJSON ) {
        var NTmodels = JSON.parse(NTmodelJSON).models;
          for ( model of NTmodels ) {
              var option = document.createElement('option');
              option.value = model.name;
              option.dataset.value = model.url;
              document.getElementById('nt-models-list').appendChild(option);
          }
        });

      document.getElementById('nt-picker').addEventListener('change', function(e) {
        for ( option of document.getElementById("nt-models-list").getElementsByTagName('option')) {
            if (option.value == e.target.value) {
              dialog.getContentElement('nt-tab', 'nt-preview').getElement().setAttribute('src', option.dataset.value);
              dialog.getContentElement('nt-tab', 'nt-preview').getElement().setAttribute('style', "width:1000px; height:1000px;");
              dialog.enableButton("ok");
            }
        }
      });
      // NOTE: on failure of the above, the NLW List will not be populated. Page reload necessary. -  12/5/2020 - CPB

      // Add a listener for iframe PostMessages. NLW sends one with the complete
      // width and height of the rendered model.
      window.addEventListener('message',
        function handleMessage(e) {
          // Check that the message is from where we think
          if (e.origin = NETLOGOWEB_SITE && e.data.type == 'nlw-resize') {
            // load in the iframe, resize, and render a border
            nlwPreview = dialog.getContentElement('nlw-tab', 'nlw-preview').getElement()
            nlwPreview.setStyle('width',  (e.data.width + "px"))
            nlwPreview.setStyle('height', (e.data.height + "px"))
            nlwPreview.setStyle("border", "1px solid black")
            dialog.enableButton("ok");
          }
          if (e.origin = NETLOGOWEB_SITE && e.data.type == 'ntb-resize') {
            // load in the iframe, resize, and render a border
            ntPreview = dialog.getContentElement('nt-tab', 'nt-preview').getElement()
            ntPreview.setStyle('width',  (e.data.width + "px"))
            ntPreview.setStyle('height', (e.data.height + "px"))
            ntPreview.setStyle("border", "1px solid black")
            dialog.enableButton("ok");
          }
        }, false);
    },

    // Invoked when the dialog is loaded.
    onShow: function() {
      var dialog = this;
      //dialog.disableButton("ok");
      // Get the selection from the editor.
      var selection = editor.getSelection();
      // Get the element at the start of the selection.
      var element = selection.getStartElement();
      // Store it for later use if needed
      this.element = element;
      this.setupContent( this.element );
    },

    // This method is invoked once a user clicks the INSERT MODEL button, confirming the dialog.
    onOk: function() {

      var dialog = this;

      var newElement = new CKEDITOR.dom.element( 'iframe' );

      if (dialog.definition.dialog._.currentTabId == "nt-tab") {
        // load up the preview element
        ntPreview = dialog.getContentElement('nt-tab', 'nt-preview').getElement()
        // Create our iframe
        newElement.setStyle('width',  ntPreview.getStyle('width'));
        newElement.setStyle('height', ntPreview.getStyle('height'));
        newElement.setAttribute('src', ntPreview.getAttribute("src"));
      }
      else if (dialog.definition.dialog._.currentTabId == "nlw-tab") {
        // load up the preview element
        nlwPreview = dialog.getContentElement('nlw-tab', 'nlw-preview').getElement()
        // Create our iframe
        newElement.setStyle('width',   nlwPreview.getStyle('width'));
        newElement.setStyle('height',  nlwPreview.getStyle('height'));
        newElement.setAttribute('src', nlwPreview.getAttribute("src"));
      }

      // Place it in the editor
      editor.insertElement( newElement );
    },
  };
});
