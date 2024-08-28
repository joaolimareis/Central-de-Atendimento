if(!window.name&&window.parent){let t=window.parent;for(let e=0;e<t.frames.length;e++)if("editor-canvas"===t.frames[e].name){window.MTiframeShouldBail=!0;break}}window.MTiframeShouldBail||(window.MTblock=function(){function t(e){return e.replace("&canvas=edit","")}let m,n,r,b={context:null,isEditor:null,hasBlocks:null,blocksContainer:null,editorHasBlocks:null,isIframe:null,isPreviewIframe:null,containerClass:"is-root-container",MTDynFrontData:null,DOMContentLoaded:0,shared:{editorPanelsReady:null,editor:null,cache:{view:{}}},observer:{},uniqueClassPattern:/\bmctr-[0-9a-z]{6}\b/,setVars:function(){var e;b.MTDynFrontData=window.MTDynFrontData,b.isIframe?(e=window.parent,m=e.wp,r=e.MTblock,b.shared=r.shared,n=b,b.iframe.win=window,b.iframe.doc=document,r.signalIframeReady(b)):(m=window.wp,r=b,e=document.getElementById("site-editor")?"fse":"regular",b.shared.TvrMT=window.TvrMT,b.shared.editor={win:window,doc:document,userInteraction:!1,context:e})},fetch:function(e,o){fetch(e,o.requestOptions).then(e=>e.json()).then(t=>{if(b.log("We fetched some data",t,o),o.cb){let e=o.cb.args||[];e.unshift(t),b.log("Running fetch callback"),o.cb.item.apply(this,e)}}).catch(e=>{console.error("Error:",e)})},checkFrontData:function(e,t){return(t=t||b.MTDynFrontData)?t[e]:null},add_block_classes_all:function(){return b.checkFrontData("add_block_classes_all")},signalIframeReady:function(e){n=e,b.log("iframe is ready",b)},isInsideMT:function(){var e=b.shared.TvrMT;return!(!e||!e.mod.MTint)&&e.mod.MTint.builderUnq.gutenberg},signalBlocksReady:function(n,a){if(n){b.blocksReady=!0,b.prevBlocksList=b.getBlockList(!0),b.log("Blocks are ready",n,a,b.prevBlocksList);let o=b.isInsideMT();if(b.shared.editor.selectorForBlockOnlyCSS&&b.adjustBlockOnlyStyles(b.shared.editor.selectorForBlockOnlyCSS,"enable",a),o){let e=TvrMT.mod.MTF,t=TvrMT.mod.MTint;var s;o.integrationSkippedOnEditor&&t.builderUnq.gutenberg.mt_frontend_setup_vars_and_init&&!b.isIframe&&(o.editorHasBlocks=!0,t.check_integrations(n,e,n.MTblock&&n.MTblock.isEditor),t.builderUnq.gutenberg.mt_frontend_setup_vars_and_init(),o.adjustLogicForBlockContent(o.mainWindow.MTDynFrontData,o.mainWindow,o.mainWindow)),b.shared.cache.view.data&&(b.MTDynFrontData=b.shared.cache.view.data,b.log("We fetch MTDynFrontData from view cache",b.MTDynFrontData)),b.shared.cache.view.pendingMTUpdate&&(s=b.shared.cache.view.pendingMTUpdate,b.log("Apply pending MT UI update",b.MTDynFrontData),o.updateMTForPageOrContentChange(o,b.MTDynFrontData,s,a,n,!0,r),r.editor.maybeResumeObservations(a),delete b.shared.cache.view.pendingMTUpdate),n.TvrMT?(b.log("MT loaded initially, before blocks were initiated",b.MTDynFrontData),b.log("MTblock.shared.cache.view.data",b.shared.cache.view.data),b.signalBlocksReadyAndMTLoaded(a)):(b.log("We need to load MT on frontend dynamically",o),o.manualFrontInit(n,a,b.MTDynFrontData,b))}else b.log("We are not inside MT"),r.shared.cache.view.pendingStylesheetReplace&&(b.log("Apply pending stylesheet replace"),b.replaceStylesheets(a,b.shared.cache.view.stylesheets),b.log("Replace pending stylesheets:"),b.log(b.shared.cache.view.stylesheets),b.editor.maybeResumeObservations(a))}},signalBlocksReadyAndMTLoaded:function(e){let t=e.querySelectorAll('link[href*="\\/micro-themes\\/"], style[id^="microthemer"]');b.log("signal Blocks Ready And MT Loaded - remove static MT assets",t,e),b.log("blocks ready, get template",b.getCurrentTemplate()),t.forEach(e=>{e.remove()})},log:function(){},uniqueClass:function(){return"mctr-"+b.randomAlphaNumString(6)},alreadyHasUniqueClass:function(e){if(e){e=e.match(b.uniqueClassPattern);if(e)return e[0]}return!1},randomAlphaNumString:function(e,t){t=void 0===t?0:t;let o=Math.random().toString(36),n=o.slice(3,3+e);return n.length!==e&&t<=10?b.randomAlphaNumString(e,++t):n},observeTarget:function(t,o){o.observerConfig=o.observerConfig||{};var e=new MutationObserver(function(e){e.forEach(function(e){o.item.apply(this,[t,e].concat(o.args||[]))})});e.observe(t,o.observerConfig),b.observer[o.name]=e},disconnect:function(e){b.observer[e]&&(b.observer[e].disconnect(),b.log("Disconnected the observer",e))},checkNodes:function(o,n){let a;if(n.length)for(let e=0;e<n.length;e++){let e=n[0],t=e.classList;if(3!==e.nodeType&&("iframeAdded"===o.context&&e.tagName&&"iframe"===e.tagName.toLowerCase()||"loaderEnded"===o.context&&t&&t.contains("edit-site-canvas-loader")||"stylesAdded"===o.context&&"mt-placeholder-inline-css"===e.id||"blockRootAdded"===o.context&&t&&(t.contains(b.containerClass)||t.contains("edit-post-layout"))||("blockAdded"===o.context||"blockRemoved"===o.context)&&t&&t.contains("wp-block"))){a=e;break}}return a},observeDomChange:function(e,t,n){t=t||document;let o=(n=n||{}).el||t.querySelector(e),a={};n.subtree&&(a.subtree=n.subtree),n.childList&&(a.childList=n.childList),n.attributes&&(a.attributes=n.attributes),n.attributeFilter&&(a.attributeFilter=n.attributeFilter),n.attributeOldValue&&(a.attributeOldValue=n.attributeOldValue),o?o.dataset.mtblockobserver!==n.name?(o.dataset.mtblockobserver=n.name,b.log("We set up observeDomChange on",o,n.name),b.observeTarget(o,{name:n.name,observerConfig:a,item:function(e,t){var o=n.checkNodeType||"addedNodes",o=b.checkNodes(n,t[o]);if(o&&n.cb){let e=n.cb.args||[];n.doNotPrependMutation||e.unshift(o,t),n.cb.item.apply(this,e)}}})):b.log("We are already observing for the change on this el",n,o):b.log("We have no el to observe",n)},blocksReadyMaybeObserve:function(e){var t=(e=e||document).defaultView;b.log("blocksReadyMaybeObserve objects",t,e),b.doBlockChecks(e),b.blocksContainer?(b.signalBlocksReady(t,e),b.disconnect("blocksContainer"),b.startObservingBlocks(t,e)):b.log("the block editor is NOT ready")},doBlockChecks:function(e){e=e.getElementsByClassName(b.containerClass);b.blocksContainer=e?e[0]:null,b.hasBlocks=!!b.blocksContainer,b.editorHasBlocks=b.hasBlocks&&b.isEditor,b.iframeHasBlocks=b.hasBlocks&&b.isIframe,b.log("doBlockChecks",e,b)},checkForLoaderEnd:function(){var e=document.querySelector(".edit-site-resizable-frame__inner-content");b.log("check For LoaderEnd"),b.observeDomChange(null,document,{el:e,name:"loaderEnded",context:"loaderEnded",checkNodeType:"removedNodes",subtree:!0,childList:!0,cb:{item:function(e){b.log("loader removed",e),b.disconnect("loaderEnded"),n||b.blocksReadyMaybeObserve(b.editor.getIframeRefs().doc)}}})},checkForIframe:function(){let o=b.shared.editor.context;b.log("Observe for iframe loading",o),b.observeDomChange("#editor, #site-editor",document,{name:"iframeAdded",context:"iframeAdded",subtree:!0,childList:!0,cb:{item:function(t,e){b.log("iframe added",o),b.disconnect("blocksContainer"),"fse"===o?b.checkForLoaderEnd():t.onload=function(){b.log("iframe loaded");var e=t.contentWindow.document;n?(b.log("Abort parent blocksReadyMaybeObserve as we have MTFblock",n),window.TvrMT&&b.signalBlocksReadyAndMTLoaded(e)):b.blocksReadyMaybeObserve(e)}},args:[]}})},checkForBlocksContainer:function(e){b.log("Observe for blocks container"),b.observeDomChange("#wpbody-content",e,{name:"blocksContainer",context:"blockRootAdded",subtree:!0,childList:!0,doNotPrependMutation:!0,cb:{item:b.blocksReadyMaybeObserve}})},startObservingBlocks:function(e,t){b.blocksContainer&&(b.blocksContainer.dataset.mtblockobserver?b.log("Block checks have already been set up"):(b.blocksContainer.dataset.mtblockobserver=1,b.log("startObservingBlocks",e),b.add_block_classes_all()&&b.addClassesToExistingBlocks(),b.checkForNewBlocks(t),b.checkForRemovedBlocks(t)))},checkForNewBlocks:function(e){b.observeDomChange("div."+b.containerClass,e,{name:"newBlocks",context:"blockAdded",subtree:!0,childList:!0,cb:{item:b.blockAdded,args:[]}})},checkForRemovedBlocks:function(e){b.observeDomChange("div."+b.containerClass,e,{checkNodeType:"removedNodes",name:"removedBlocks",context:"blockRemoved",subtree:!0,childList:!0,cb:{item:b.blockRemoved,args:[]}})},blockAdded:function(e,t){b.add_block_classes_all()&&b.maybeAddClassToBlock(e,t,"new",!0),b.maybeAdjustMTLoadingForBlockChange("added")},blockRemoved:function(e,t){b.maybeAdjustMTLoadingForBlockChange("removed")},getLiveData:function(t,o){if(t){let e={live_post_content:t.refsHtml};return o&&(e.live_template=r.getCurrentTemplate()),e}return null},maybeAdjustMTLoadingForBlockChange:function(e){b.actionAfterTimeout("blocksAddedOrRemoved",250,{item:function(){var e,t;b.prevBlocksList&&(e=b.getBlockList(!0),t=b.checkBlockListChange(b.prevBlocksList,e),b.log("The change",t),(t.removed.length||t.added.length)&&(b.prevBlocksList=e,b.editor.remoteQueryAssetLoading(b.shared.editor.doc.location.href,b.getLiveData(e,!0))))},args:[]})},timer:{},prevReusableBlocks:null,getSourceFromBlockName:function(e){let t=e;switch(e){case"core/block":case"core/pattern":t="wp_pattern";break;case"core/navigation":t="wp_navigation";break;case"core/template-part":t="wp_template_part"}return t},iterateBlockList:function(a,s,r){if(a){var i=Object.keys(a);for(let n=0;n<i.length;n++){let t=a[i[n]],o;if(r){let e=r.args||[];e.push(t,i[n],a,s),o=r.item.apply(this,e)}if("continue"!==o){if("break"===o)break;t.innerBlocks&&b.iterateBlockList(t.innerBlocks,s,r)}}}},checkBlockListChange:function(e,t){let n={older:{list:e.list,refs:e.refs},newer:{list:t.list,refs:t.refs},added:[],removed:[]};return["older","newer"].forEach(o=>{let e=Object.keys(n[o].refs);e.forEach(e=>{var t={ref:e,name:n[o].refs[e]};"older"===o?n.newer.refs[e]||n.removed.push(t):"newer"===o&&(n.older.refs[e]||n.added.push(t))})}),n},actionAfterTimeout:function(e,t,o){b.timer[e]&&(clearTimeout(b.timer[e]),delete b.timer[e]),b.timer[e]=setTimeout(function(){o.item.apply(this,o.args)},t)},addClassesToExistingBlocks:function(){var t=b.blocksContainer.getElementsByClassName("wp-block"),o=b.add_block_classes_all();for(let e=0;e<t.length;e++)b.maybeAddClassToBlock(t[e],null,"existing",o)},maybeAddClassToBlock:function(e,t,o,n,a){if(e){var s=e.dataset.block;if("existing"!==o&&b.log("maybeAddClassToBlock",o,s,e),s)return b.addUniqueClass(e,s,o,n,a)}return!1},handleClassExceptions:function(e,t,o){let n={},a=e.classList;return a&&(a.contains("wp-block-kadence-singlebtn")&&(b.log("Kadence button exception, skip class",t,e),n.skip=!0),(a.contains("wp-block-freeform")||a.contains("block-library-html__edit"))&&(b.log("Gutenberg exception",t,e),n.skip=!0)),n},addUniqueClass:function(t,e,o,n,a){let s,r,i=!1;if(!b.blocksSupportsCustomClass(e))return b.log("Block cannot receive a custom class",e,t),!1;if(b.log("Block is eligible for a custom class",e,t),e){const{select:d,dispatch:u}=m.data;var l=b.getBlockAttributes(e);if(r=b.uniqueClass(),s=r,b.log("Current attributes",l,e,t.classList),b.handleClassExceptions(t,e,l.className).skip&&(i=!0),i||l&&l.className&&(b.alreadyHasUniqueClass(l.className)?(i=!0,b.log("Unique class has already been added",l.className,e)):(r+=" "+l.className,b.log("Combine MT class with existing",r,e))),i||(a&&(a[s]=1),"selection"===o&&t.classList.add(s),u("core/block-editor").updateBlockAttributes(e,{className:r}),"existing"!==o&&b.log("Unique class added to the editor",r,e)),n){var c=d("core/block-editor").getClientIdsOfDescendants(e);for(let e=0;e<c.length;e++)b.addUniqueClass(t,c[e],o,n,a)}}return!i&&r},removeUniqueClass:function(e,t){const{dispatch:o}=m.data;var n=e.dataset.block,a=b.getBlockAttributes(n);if(b.log("maybe removeUniqueClass",a," on ",e),a){const s=a.className,r=b.alreadyHasUniqueClass(s);s&&r&&(a=s.split(/\s+/).filter(e=>e!==r).join(" "),"selection"===t&&e.classList.remove(r),o("core/block-editor").updateBlockAttributes(n,{className:a}),b.log("className was cleaned from",s,"to",a," on ",e))}},blocksSupportsCustomClass:function(e){return!0},getBlockOptions:function(e){const{select:t}=m.data;e=t("core/block-editor").getBlock(e);return{block:e,blockOptions:e?t("core/blocks").getBlockType(e.name):null}},subscribe:function(o){const{select:n,subscribe:e,dispatch:a}=m.data;return e(()=>{let e=o.cb,t=e.args||[];t.push(n,a),e.args=t,e&&(o.timeout?b.actionAfterTimeout(o.name,o.timeout,e):e.item.apply(this,e.args))})},setDeviceType:function(e){const{dispatch:t}=m.data;t("core/editor").setDeviceType(e)},getCurrentTemplate:function(){const{select:e}=m.data;return e("core/editor").getEditedPostAttribute("template")},getCurrentScreenTitle:function(){const{select:e}=m.data,t=e("core/editor");return t.getEditedPostAttribute("title")||""},selectorForBlockOnlyCSS:"",adjustBlockOnlyStyles:function(e,t,o){let n,a=window.MTblock,s=a&&a.isEditor;return a.log("adjustBlockOnlyStyles",t,window.TvrMT),e&&o&&o.head&&(n=o.head.querySelectorAll(e),a.log("adjustBlockOnlyStyles styles",t,n),n.forEach(e=>{"disable"===t?e.setAttribute("media","not all"):s&&"microthemer-css"===e.id||e.setAttribute("media","all")})),n},disableBlockOnlyStyles:function(){let t=b.MTDynFrontData.folderLoading,o=Object.keys(t),n="style#microthemer-sectionSlug-inline-css, link#microthemer-sectionSlug-css",a=["#microthemer-css"];for(let e=0;e<o.length;e++){var s=o[e];"blocksOnly"===t[s]&&a.push(n.replace(/sectionSlug/g,s))}a.length&&(b.shared.editor.selectorForBlockOnlyCSS=a.join(", "),b.shared.editor.disabledEditorStyles=b.adjustBlockOnlyStyles(b.shared.editor.selectorForBlockOnlyCSS,"disable",document)),b.log("disableBlockOnlyStyles",a,b.shared.editor.selectorForBlockOnlyCSS)},replaceMTAssets:function(e,t,n,o){t=t+(-1<t.indexOf("?")?"&":"?")+"test_logic=1&test_all&get_simple_stylesheets=1";n.log("replaceMTAssets origStyles",t,o);let a=new FormData;o&&(a.append("live_post_content",o.live_post_content),a.append("live_template",o.live_template)),n.fetch(t,{requestOptions:o?{method:"POST",body:a}:null,cb:{item:function(e){var t=r.editor.getIframeRefs().doc,o=t&&t.head&&t.head.childElementCount;n.shared.cache.view.stylesheets=e.stylesheets,o?(n.replaceStylesheets(t,e.stylesheets),n.log("Replace stylesheets:"),n.log(e.stylesheets),n.editor.maybeResumeObservations(t)):(n.log("No blocks document available in the current view, cache",e.stylesheets),r.shared.cache.view.pendingStylesheetReplace=!0)}}})},replaceStylesheets:function(e,t){let o=e.getElementById("mt-placeholder-inline-css"),n=e.querySelectorAll('link[href*="\\/micro-themes\\/"], style[id^="microthemer"]');t&&o.insertAdjacentHTML("afterend",t),n.forEach(e=>{e.remove()})},extractBlockRefs:function(o,n){var a=n.attributes;if(a){var s=a.ref,r=a.slug,i=a.theme,l=s||(i&&r?i+"//"+r:!("core/pattern"!==n.name||!r)&&r);if(l){s=b.getSourceFromBlockName(n.name);o.refs[l]=s;let e="",t=isNaN(l)?'"'+l+'"':l;switch(s){case"wp_template_part":e='\x3c!-- wp:template-part {"slug":"'+r+'","theme":"'+i+'","tagName":"'+a.tagName+'"} /--\x3e';break;case"wp_pattern":e="core/pattern"===n.name?'\x3c!-- wp:pattern {"slug":"'+r+'"} /--\x3e':'\x3c!-- wp:block {"ref":'+t+"} /--\x3e";break;case"wp_navigation":e='\x3c!-- wp:navigation {"ref":'+t+"} /--\x3e"}o.refsHtml+=e+"\n"}}},getBlockList:function(e,t){let o=m.data.select("core/block-editor").getBlocks(),n={updated:{},refs:{},refsHtml:"",refsHtmlParts:{root:""}};return e&&(o=structuredClone(o)),t||b.iterateBlockList(o,n,{item:function(o,e,t){if(!n.updated[o.clientId])switch(o.name){case"core/post-content":case"core/template-part":case"core/block":case"core/navigation":if(!("core/block"!==o.name&&"core/navigation"!==o.name||o.attributes&&o.attributes.ref))return;b.extractBlockRefs(n,o);let{select:t}=m.data,e=t("core/block-editor").getClientIdsOfDescendants(o.clientId);e.length&&!o.innerBlocks.length&&(o.innerBlocks=[],e.forEach(e=>{e=t("core/block-editor").getBlock(e);t("core/block-editor").getBlockParents(e.clientId,!0)[0]===o.clientId&&o.innerBlocks.push(e)}),n.updated[o.clientId]=1)}}}),b.log("getBlockList",o,n),{refs:n.refs,refsHtml:n.refsHtml,list:o}},getPostContent:function(t){const{select:e}=m.data;if("fse"!==b.shared.editor.context)return e("core/editor").getEditedPostContent();{let n="",a=m.blocks.getSaveContent,e={};return b.iterateBlockList(t,e,{item:function(e,t,o){e=a(e.name,e.attributes,e.innerBlocks);n+=e}}),n}},getPostTitle:function(){const{select:e}=m.data;return e("core/editor").getEditedPostAttribute("title")},getSelectedBlockClientId:function(e){const{select:t}=m.data;return t("core/block-editor").getSelectedBlockClientId()},selectBlock:function(e){const{dispatch:t}=m.data;t("core/block-editor").selectBlock(e)},getBlockAttributes:function(e){const{select:t}=m.data;return t("core/block-editor").getBlockAttributes(e)},getClientId:function(e){return e.dataset.block},getClosestBlock:function(e){return e.closest(".wp-block")},getUserDefinedClass:function(t,o){t=b.getClientId(t);if(t){let e=b.getBlockAttributes(t);if(e&&e.className)return o?e.className.split(/\s+/):e.className}return!1},getUserDefinedId:function(e){e=b.getClientId(e);if(e){e=b.getBlockAttributes(e);if(e&&e.anchor)return e.anchor}return!1},savePost:function(e){m.data.dispatch("core/editor").savePost(),e.unsavedMTClasses={}},updateAllDataStores:function(t,o){[b,r,n].forEach(e=>{e&&(e.MTDynFrontData[t]=o)})},editor:{init:function(){b.log("We run editor init",b),b.disableBlockOnlyStyles(),b.editor.handleAddressBarChange(),b.editor.handleClicks(),b.editorHasBlocks?b.blocksReadyMaybeObserve():(b.checkForIframe(),b.checkForBlocksContainer())},userInteractionHappened:function(){b.shared.editor.userInteraction=!0,b.log("userInteractionHappened",b.context)},getIframeRefs:function(){var e=window.frames["editor-canvas"];return{win:e,doc:e?e.document:void 0}},prevBrowserUrl:t(document.location.href),setupCustomLocationChangeEvent:function(){let t=history.pushState;history.pushState=function(){var e=t.apply(this,arguments);return window.dispatchEvent(new Event("pushstate")),window.dispatchEvent(new Event("locationchange")),e};let o=history.replaceState;history.replaceState=function(){var e=o.apply(this,arguments);return window.dispatchEvent(new Event("replacestate")),window.dispatchEvent(new Event("locationchange")),e},window.addEventListener("popstate",()=>{window.dispatchEvent(new Event("locationchange"))})},handleAddressBarChange:function(){b.log("set up handleAddressBarChange",window),b.editor.setupCustomLocationChangeEvent(),window.addEventListener("locationchange",function(){var e=t(document.location.href);b.log("currentBrowserUrl, MTblock.editor.prevBrowserUrl",e,b.editor.prevBrowserUrl),e!==b.editor.prevBrowserUrl&&b.editor.handleViewChange(e)})},handleClicks:function(){document.addEventListener("click",e=>{let t=e.target,o=(t.tagName.toLowerCase(),t.getAttribute("class"));o&&o.split(/\s+/)})},remoteQueryAssetLoading:function(t,o){b.shared.cache.view={};let e=new URL(t).searchParams,n=t;if("fse"!==b.shared.editor.context||e.get("postId")||(n=b.MTDynFrontData.home_url),b.log("effectiveTestUrl",n,t),b.shared.TvrMT){let e=b.shared.TvrMT.mod.MTint.builderUnq.gutenberg;e.simulatePageOrContentChange(e,t,n,r,o)}else b.replaceMTAssets(t,n,r,o)},maybeResumeObservations:function(e){b.log("Is the container still connected",b.blocksContainer&&b.blocksContainer.isConnected),b.blocksContainer&&b.blocksContainer.isConnected||(b.log("No, we need to resume observations"),b.blocksReadyMaybeObserve(e))},handleViewChange:function(e){b.log("handleViewChange from ",b.editor.prevBrowserUrl," to ",e),b.editor.prevBrowserUrl=e,b.updateAllDataStores("iframe-url",e),b.editor.remoteQueryAssetLoading(e)}},iframe:{win:null,doc:null,userInteraction:null,init:function(){b.log("We run iframe init"),b.MTDynFrontData.hasBlocks=!0;let e=b.isInsideMT();e&&e.adjustLogicForBlockContent(b.MTDynFrontData,window,window.parent),b.iframeHasBlocks&&b.blocksReadyMaybeObserve()},userInteractionHappened:function(){b.iframe.userInteraction=!0,b.log("userInteractionHappened",b.context)},isPreviewThumb:function(){}}};return document.addEventListener("DOMContentLoaded",e=>{b.DOMContentLoaded++;let t=document.body.classList,o=document.documentElement.classList,n="block-editor-block-preview__content-iframe";b.isEditor=t.contains("block-editor-page"),b.isIframe=t.contains("block-editor-iframe__body"),b.isPreviewIframe=t.contains(n)||o.contains(n),b.doBlockChecks(document),b.isPreviewIframe?b.log("Do not run any code when iframe is loaded as a thumbnail preview","/wp-admin/site-editor.php?path=%2Fpatterns"):(b.context=b.isIframe?"iframe":"editor",b.setVars(),b[b.context].init())},{once:!0}),b}());