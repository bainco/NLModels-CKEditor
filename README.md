# NLModels Browser Plugin for CKEditor

A new CKEditor Plugin that allows users to browse and embed any NetLogo Web model that is currently available in the official [NLW Models Library](https://www.netlogoweb.org).

## How to Use
Functionality is pretty simple:
1. There's a new CKEditor toolbar button (for Page editor and Question editor) (see `settings.py`) ![Screen Shot 2020-12-04 at 12 28 58 PM](https://user-images.githubusercontent.com/2212919/101194701-5526d000-362c-11eb-88f7-da647f4139b9.png)
2. When a user clicks on the toolbar button, they're presented with the usual CKEditor dialog pop-up with a single Selector. This selector is populated directly from `www.netlogoweb.org/model/models.json` (for NLW models) and from `www.github.com/NetLogo/nt-models/library.json` (for NetTango models) on plugin load. This means each time the plugin is instantiated, we get the live, most-up-to-date versions of each model from the libraries (and prune those that don't compile in NLW currently -- this is also live updated so no manual updating as NLW features are added).![Screen Shot 2021-04-05 at 10 34 17 AM](https://user-images.githubusercontent.com/2212919/113592628-03eb1500-95fb-11eb-9dc3-fdb29cb5d0f6.png)
3. As of v2, there are now 2 tabs, one for the NetLogo Web Models Library (default) and one for the NetTango models library.
4. A searchbox in each tab is populated with all available models in each library. Users can type into each searchbox using any keyword that might appear in the model's title (or in the case of the NLW models, the folder in which the model lives). This means, users looking for Biology models need only type `Biology` and see what models are available. ![Screen Shot 2021-04-05 at 10 34 28 AM](https://user-images.githubusercontent.com/2212919/113592833-46aced00-95fb-11eb-9461-ce1c08b4bbc2.png)
5. When you select one, the dialog resizes and allows you to preview the model. 
NetLogo Web
![Screen Shot 2021-04-05 at 10 35 02 AM](https://user-images.githubusercontent.com/2212919/113592878-53c9dc00-95fb-11eb-8aa8-d99b42e65337.png)
NetTango
![Screen Shot 2021-04-05 at 10 35 33 AM](https://user-images.githubusercontent.com/2212919/113592915-62b08e80-95fb-11eb-80bb-eb2849e5f687.png)

6. When the user clicks `Insert Model`, the model is embedded as an `iframe` into the appropriate CKEditor at the cursor point. Note, it directly embeds a link to the live versions of the library models rather than uploading the model to the CT-STEM site. This has the advantage that every time the model loads, you get the newest version of both the model and NLW.
7. 
## Installation
This has been tested and deployed on CKEditor 4 (specifically on Django-CKEditor). Note, that it also requires the `ajax` and `iframedialog` plugins to be installed and enabled on your CKEditor deployment.

To install, make sure to place the plugin inside your static hosted files or directly into your CKEditor package. As with all CKEditor plugins, _the plugin must be in a folder with the `NLModels` name exactly._

Finally, add the plugin to your toolbar using the `NLModels` tool.

## Questions or Issues?
Feel free to open an issue on this repo or send me an email at [connorbain@u.northwestern.edu](mailto:connorbain@u.northwestern.edu) with `[NLW CKEditor]` in the subject line.
