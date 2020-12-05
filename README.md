# NLModels Browser Plugin for CKEditor

A new CKEditor Plugin that allows users to browse and embed any NetLogo Web model that is currently available in the official [NLW Models Library](https://www.netlogoweb.org).

## How to Use
Functionality is pretty simple:
1. There's a new CKEditor toolbar button (for Page editor and Question editor) (see `settings.py`) ![Screen Shot 2020-12-04 at 12 28 58 PM](https://user-images.githubusercontent.com/2212919/101194701-5526d000-362c-11eb-88f7-da647f4139b9.png)
2. When a user clicks on the toolbar button, they're presented with the usual CKEditor dialog pop-up with a single Selector. This selector is populated directly from `www.netlogoweb.org/model/models.json` on plugin load. This means each time the plugin is instantiated, we get the live, most-up-to-date versions of each model from the library (and prune those that don't compile in NLW currently -- this is also live updated so no manual updating as NLW features are added).![Screen Shot 2020-12-04 at 12 31 18 PM](https://user-images.githubusercontent.com/2212919/101194897-a0d97980-362c-11eb-81b0-3af9640496a5.png)
3. The drop-down is populated with all available models. When you select one, the dialog resizes and allows you to preview the model.![Screen Shot 2020-12-04 at 12 32 39 PM](https://user-images.githubusercontent.com/2212919/101195031-d1b9ae80-362c-11eb-946d-a9a11074df4c.png)
4. When the user clicks `Insert Model`, the model is embedded as an `iframe` into the appropriate CKEditor at the cursor point. Note, it directly embeds a link to the NLW server rather than uploading the model to the CT-STEM site. This has the advantage that every time the model loads, you get the newest version of both the model and NLW. This could be seen as a downside, but I think of it as a good thing.

## Installation
This has been tested and deployed on CKEditor 4 (specifically on Django-CKEditor). Note, that it also requires the `ajax` and `iframedialog` plugins to be installed and enabled on your CKEditor deployment.

To install, make sure to place the plugin inside your static hosted files or directly into your CKEditor package. As with all CKEditor plugins, _the plugin must be in a folder with the `NLModels` name exactly._

Finally, add the plugin to your toolbar using the `NLModels` tool.

## Questions or Issues?
Feel free to open an issue on this repo or send me an email at [connorbain@u.northwestern.edu](mailto:connorbain@u.northwestern.edu) with `[NLW CKEditor]` in the subject line.
