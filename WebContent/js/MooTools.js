//MooTools, My Object Oriented Javascript Tools. Copyright (c) 2006 Valerio Proietti, <http://mad4milk.net>, MIT Style License.

var MooTools={version:'1.12'};function $defined(obj){return(obj!=undefined);};function $type(obj){if(!$defined(obj))return false;if(obj.htmlElement)return'element';var type=typeof obj;if(type=='object'&&obj.nodeName){switch(obj.nodeType){case 1:return'element';case 3:return(/\S/).test(obj.nodeValue)?'textnode':'whitespace';}}
if(type=='object'||type=='function'){switch(obj.constructor){case Array:return'array';case RegExp:return'regexp';case Class:return'class';}
if(typeof obj.length=='number'){if(obj.item)return'collection';if(obj.callee)return'arguments';}}
return type;};function $merge(){var mix={};for(var i=0;i<arguments.length;i++){for(var property in arguments[i]){var ap=arguments[i][property];var mp=mix[property];if(mp&&$type(ap)=='object'&&$type(mp)=='object')mix[property]=$merge(mp,ap);else mix[property]=ap;}}
return mix;};var $extend=function(){var args=arguments;if(!args[1])args=[this,args[0]];for(var property in args[1])args[0][property]=args[1][property];return args[0];};var $native=function(){for(var i=0,l=arguments.length;i<l;i++){arguments[i].extend=function(props){for(var prop in props){if(!this.prototype[prop])this.prototype[prop]=props[prop];if(!this[prop])this[prop]=$native.generic(prop);}};}};$native.generic=function(prop){return function(bind){return this.prototype[prop].apply(bind,Array.prototype.slice.call(arguments,1));};};$native(Function,Array,String,Number);function $chk(obj){return!!(obj||obj===0);};function $pick(obj,picked){return $defined(obj)?obj:picked;};function $random(min,max){return Math.floor(Math.random()*(max-min+1)+min);};function $time(){return new Date().getTime();};function $clear(timer){clearTimeout(timer);clearInterval(timer);return null;};var Abstract=function(obj){obj=obj||{};obj.extend=$extend;return obj;};var Window=new Abstract(window);var Document=new Abstract(document);document.head=document.getElementsByTagName('head')[0];window.xpath=!!(document.evaluate);if(window.ActiveXObject)window.ie=window[window.XMLHttpRequest?'ie7':'ie6']=true;else if(document.childNodes&&!document.all&&!navigator.taintEnabled)window.webkit=window[window.xpath?'webkit420':'webkit419']=true;else if(document.getBoxObjectFor!=null||window.mozInnerScreenX!=null)window.gecko=true;window.khtml=window.webkit;Object.extend=$extend;if(typeof HTMLElement=='undefined'){var HTMLElement=function(){};if(window.webkit)document.createElement("iframe");HTMLElement.prototype=(window.webkit)?window["[[DOMElement.prototype]]"]:{};}
HTMLElement.prototype.htmlElement=function(){};if(window.ie6)try{document.execCommand("BackgroundImageCache",false,true);}catch(e){};var Class=function(properties){var klass=function(){return(arguments[0]!==null&&this.initialize&&$type(this.initialize)=='function')?this.initialize.apply(this,arguments):this;};$extend(klass,this);klass.prototype=properties;klass.constructor=Class;return klass;};Class.empty=function(){};Class.prototype={extend:function(properties){var proto=new this(null);for(var property in properties){var pp=proto[property];proto[property]=Class.Merge(pp,properties[property]);}
return new Class(proto);},implement:function(){for(var i=0,l=arguments.length;i<l;i++)$extend(this.prototype,arguments[i]);}};Class.Merge=function(previous,current){if(previous&&previous!=current){var type=$type(current);if(type!=$type(previous))return current;switch(type){case'function':var merged=function(){this.parent=arguments.callee.parent;return current.apply(this,arguments);};merged.parent=previous;return merged;case'object':return $merge(previous,current);}}
return current;};var Chain=new Class({chain:function(fn){this.chains=this.chains||[];this.chains.push(fn);return this;},callChain:function(){if(this.chains&&this.chains.length)this.chains.shift().delay(10,this);},clearChain:function(){this.chains=[];}});var Events=new Class({addEvent:function(type,fn){if(fn!=Class.empty){this.$events=this.$events||{};this.$events[type]=this.$events[type]||[];this.$events[type].include(fn);}
return this;},fireEvent:function(type,args,delay){if(this.$events&&this.$events[type]){this.$events[type].each(function(fn){fn.create({'bind':this,'delay':delay,'arguments':args})();},this);}
return this;},removeEvent:function(type,fn){if(this.$events&&this.$events[type])this.$events[type].remove(fn);return this;}});var Options=new Class({setOptions:function(){this.options=$merge.apply(null,[this.options].extend(arguments));if(this.addEvent){for(var option in this.options){if($type(this.options[option]=='function')&&(/^on[A-Z]/).test(option))this.addEvent(option,this.options[option]);}}
return this;}});Array.extend({forEach:function(fn,bind){for(var i=0,j=this.length;i<j;i++)fn.call(bind,this[i],i,this);},filter:function(fn,bind){var results=[];for(var i=0,j=this.length;i<j;i++){if(fn.call(bind,this[i],i,this))results.push(this[i]);}
return results;},map:function(fn,bind){var results=[];for(var i=0,j=this.length;i<j;i++)results[i]=fn.call(bind,this[i],i,this);return results;},every:function(fn,bind){for(var i=0,j=this.length;i<j;i++){if(!fn.call(bind,this[i],i,this))return false;}
return true;},some:function(fn,bind){for(var i=0,j=this.length;i<j;i++){if(fn.call(bind,this[i],i,this))return true;}
return false;},indexOf:function(item,from){var len=this.length;for(var i=(from<0)?Math.max(0,len+from):from||0;i<len;i++){if(this[i]===item)return i;}
return-1;},copy:function(start,length){start=start||0;if(start<0)start=this.length+start;length=length||(this.length-start);var newArray=[];for(var i=0;i<length;i++)newArray[i]=this[start++];return newArray;},remove:function(item){var i=0;var len=this.length;while(i<len){if(this[i]===item){this.splice(i,1);len--;}else{i++;}}
return this;},contains:function(item,from){return this.indexOf(item,from)!=-1;},associate:function(keys){var obj={},length=Math.min(this.length,keys.length);for(var i=0;i<length;i++)obj[keys[i]]=this[i];return obj;},extend:function(array){for(var i=0,j=array.length;i<j;i++)this.push(array[i]);return this;},merge:function(array){for(var i=0,l=array.length;i<l;i++)this.include(array[i]);return this;},include:function(item){if(!this.contains(item))this.push(item);return this;},getRandom:function(){return this[$random(0,this.length-1)]||null;},getLast:function(){return this[this.length-1]||null;}});Array.prototype.each=Array.prototype.forEach;Array.each=Array.forEach;function $A(array){return Array.copy(array);};function $each(iterable,fn,bind){if(iterable&&typeof iterable.length=='number'&&$type(iterable)!='object'){Array.forEach(iterable,fn,bind);}else{for(var name in iterable)fn.call(bind||iterable,iterable[name],name);}};Array.prototype.test=Array.prototype.contains;String.extend({test:function(regex,params){return(($type(regex)=='string')?new RegExp(regex,params):regex).test(this);},toInt:function(){return parseInt(this,10);},toFloat:function(){return parseFloat(this);},camelCase:function(){return this.replace(/-\D/g,function(match){return match.charAt(1).toUpperCase();});},hyphenate:function(){return this.replace(/\w[A-Z]/g,function(match){return(match.charAt(0)+'-'+match.charAt(1).toLowerCase());});},capitalize:function(){return this.replace(/\b[a-z]/g,function(match){return match.toUpperCase();});},trim:function(){return this.replace(/^\s+|\s+$/g,'');},clean:function(){return this.replace(/\s{2,}/g,' ').trim();},rgbToHex:function(array){var rgb=this.match(/\d{1,3}/g);return(rgb)?rgb.rgbToHex(array):false;},hexToRgb:function(array){var hex=this.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);return(hex)?hex.slice(1).hexToRgb(array):false;},contains:function(string,s){return(s)?(s+this+s).indexOf(s+string+s)>-1:this.indexOf(string)>-1;},escapeRegExp:function(){return this.replace(/([.*+?^${}()|[\]\/\\])/g,'\\$1');}});Array.extend({rgbToHex:function(array){if(this.length<3)return false;if(this.length==4&&this[3]==0&&!array)return'transparent';var hex=[];for(var i=0;i<3;i++){var bit=(this[i]-0).toString(16);hex.push((bit.length==1)?'0'+bit:bit);}
return array?hex:'#'+hex.join('');},hexToRgb:function(array){if(this.length!=3)return false;var rgb=[];for(var i=0;i<3;i++){rgb.push(parseInt((this[i].length==1)?this[i]+this[i]:this[i],16));}
return array?rgb:'rgb('+rgb.join(',')+')';}});Function.extend({create:function(options){var fn=this;options=$merge({'bind':fn,'event':false,'arguments':null,'delay':false,'periodical':false,'attempt':false},options);if($chk(options.arguments)&&$type(options.arguments)!='array')options.arguments=[options.arguments];return function(event){var args;if(options.event){event=event||window.event;args=[(options.event===true)?event:new options.event(event)];if(options.arguments)args.extend(options.arguments);}
else args=options.arguments||arguments;var returns=function(){return fn.apply($pick(options.bind,fn),args);};if(options.delay)return setTimeout(returns,options.delay);if(options.periodical)return setInterval(returns,options.periodical);if(options.attempt)try{return returns();}catch(err){return false;};return returns();};},pass:function(args,bind){return this.create({'arguments':args,'bind':bind});},attempt:function(args,bind){return this.create({'arguments':args,'bind':bind,'attempt':true})();},bind:function(bind,args){return this.create({'bind':bind,'arguments':args});},bindAsEventListener:function(bind,args){return this.create({'bind':bind,'event':true,'arguments':args});},delay:function(delay,bind,args){return this.create({'delay':delay,'bind':bind,'arguments':args})();},periodical:function(interval,bind,args){return this.create({'periodical':interval,'bind':bind,'arguments':args})();}});Number.extend({toInt:function(){return parseInt(this);},toFloat:function(){return parseFloat(this);},limit:function(min,max){return Math.min(max,Math.max(min,this));},round:function(precision){precision=Math.pow(10,precision||0);return Math.round(this*precision)/precision;},times:function(fn){for(var i=0;i<this;i++)fn(i);}});var Element=new Class({initialize:function(el,props){if($type(el)=='string'){if(window.ie&&props&&(props.name||props.type)){var name=(props.name)?' name="'+props.name+'"':'';var type=(props.type)?' type="'+props.type+'"':'';delete props.name;delete props.type;el='<'+el+name+type+'>';}
el=document.createElement(el);}
el=$(el);return(!props||!el)?el:el.set(props);}});var Elements=new Class({initialize:function(elements){return(elements)?$extend(elements,this):this;}});Elements.extend=function(props){for(var prop in props){this.prototype[prop]=props[prop];this[prop]=$native.generic(prop);}};function $(el){if(!el)return null;if(el.htmlElement)return Garbage.collect(el);if([window,document].contains(el))return el;var type=$type(el);if(type=='string'){el=document.getElementById(el);type=(el)?'element':false;}
if(type!='element')return null;if(el.htmlElement)return Garbage.collect(el);if(['object','embed'].contains(el.tagName.toLowerCase()))return el;$extend(el,Element.prototype);el.htmlElement=function(){};return Garbage.collect(el);};document.getElementsBySelector=document.getElementsByTagName;function $$(){var elements=[];for(var i=0,j=arguments.length;i<j;i++){var selector=arguments[i];switch($type(selector)){case'element':elements.push(selector);case'boolean':break;case false:break;case'string':selector=document.getElementsBySelector(selector,true);default:elements.extend(selector);}}
return $$.unique(elements);};$$.unique=function(array){var elements=[];for(var i=0,l=array.length;i<l;i++){if(array[i].$included)continue;var element=$(array[i]);if(element&&!element.$included){element.$included=true;elements.push(element);}}
for(var n=0,d=elements.length;n<d;n++)elements[n].$included=null;return new Elements(elements);};Elements.Multi=function(property){return function(){var args=arguments;var items=[];var elements=true;for(var i=0,j=this.length,returns;i<j;i++){returns=this[i][property].apply(this[i],args);if($type(returns)!='element')elements=false;items.push(returns);};return(elements)?$$.unique(items):items;};};Element.extend=function(properties){for(var property in properties){HTMLElement.prototype[property]=properties[property];Element.prototype[property]=properties[property];Element[property]=$native.generic(property);var elementsProperty=(Array.prototype[property])?property+'Elements':property;Elements.prototype[elementsProperty]=Elements.Multi(property);}};Element.extend({set:function(props){for(var prop in props){var val=props[prop];switch(prop){case'styles':this.setStyles(val);break;case'events':if(this.addEvents)this.addEvents(val);break;case'properties':this.setProperties(val);break;default:this.setProperty(prop,val);}}
return this;},inject:function(el,where){el=$(el);switch(where){case'before':el.parentNode.insertBefore(this,el);break;case'after':var next=el.getNext();if(!next)el.parentNode.appendChild(this);else el.parentNode.insertBefore(this,next);break;case'top':var first=el.firstChild;if(first){el.insertBefore(this,first);break;}
default:el.appendChild(this);}
return this;},injectBefore:function(el){return this.inject(el,'before');},injectAfter:function(el){return this.inject(el,'after');},injectInside:function(el){return this.inject(el,'bottom');},injectTop:function(el){return this.inject(el,'top');},adopt:function(){var elements=[];$each(arguments,function(argument){elements=elements.concat(argument);});$$(elements).inject(this);return this;},remove:function(){return this.parentNode.removeChild(this);},clone:function(contents){var el=$(this.cloneNode(contents!==false));if(!el.$events)return el;el.$events={};for(var type in this.$events)el.$events[type]={'keys':$A(this.$events[type].keys),'values':$A(this.$events[type].values)};return el.removeEvents();},replaceWith:function(el){el=$(el);this.parentNode.replaceChild(el,this);return el;},appendText:function(text){this.appendChild(document.createTextNode(text));return this;},hasClass:function(className){return this.className.contains(className,' ');},addClass:function(className){if(!this.hasClass(className))this.className=(this.className+' '+className).clean();return this;},removeClass:function(className){this.className=this.className.replace(new RegExp('(^|\\s)'+className+'(?:\\s|$)'),'$1').clean();return this;},toggleClass:function(className){return this.hasClass(className)?this.removeClass(className):this.addClass(className);},setStyle:function(property,value){switch(property){case'opacity':return this.setOpacity(parseFloat(value));case'float':property=(window.ie)?'styleFloat':'cssFloat';}
property=property.camelCase();switch($type(value)){case'number':if(!['zIndex','zoom'].contains(property))value+='px';break;case'array':value='rgb('+value.join(',')+')';}
this.style[property]=value;return this;},setStyles:function(source){switch($type(source)){case'object':Element.setMany(this,'setStyle',source);break;case'string':this.style.cssText=source;}
return this;},setOpacity:function(opacity){if(opacity==0){if(this.style.visibility!="hidden")this.style.visibility="hidden";}else{if(this.style.visibility!="visible")this.style.visibility="visible";}
if(!this.currentStyle||!this.currentStyle.hasLayout)this.style.zoom=1;if(window.ie)this.style.filter=(opacity==1)?'':"alpha(opacity="+opacity*100+")";this.style.opacity=this.$tmp.opacity=opacity;return this;},getStyle:function(property){property=property.camelCase();var result=this.style[property];if(!$chk(result)){if(property=='opacity')return this.$tmp.opacity;result=[];for(var style in Element.Styles){if(property==style){Element.Styles[style].each(function(s){var style=this.getStyle(s);result.push(parseInt(style)?style:'0px');},this);if(property=='border'){var every=result.every(function(bit){return(bit==result[0]);});return(every)?result[0]:false;}
return result.join(' ');}}
if(property.contains('border')){if(Element.Styles.border.contains(property)){return['Width','Style','Color'].map(function(p){return this.getStyle(property+p);},this).join(' ');}else if(Element.borderShort.contains(property)){return['Top','Right','Bottom','Left'].map(function(p){return this.getStyle('border'+p+property.replace('border',''));},this).join(' ');}}
if(document.defaultView)result=document.defaultView.getComputedStyle(this,null).getPropertyValue(property.hyphenate());else if(this.currentStyle)result=this.currentStyle[property];}
if(window.ie)result=Element.fixStyle(property,result,this);if(result&&property.test(/color/i)&&result.contains('rgb')){return result.split('rgb').splice(1,4).map(function(color){return color.rgbToHex();}).join(' ');}
return result;},getStyles:function(){return Element.getMany(this,'getStyle',arguments);},walk:function(brother,start){brother+='Sibling';var el=(start)?this[start]:this[brother];while(el&&$type(el)!='element')el=el[brother];return $(el);},getPrevious:function(){return this.walk('previous');},getNext:function(){return this.walk('next');},getFirst:function(){return this.walk('next','firstChild');},getLast:function(){return this.walk('previous','lastChild');},getParent:function(){return $(this.parentNode);},getChildren:function(){return $$(this.childNodes);},hasChild:function(el){return!!$A(this.getElementsByTagName('*')).contains(el);},getProperty:function(property){var index=Element.Properties[property];if(index)return this[index];var flag=Element.PropertiesIFlag[property]||0;if(!window.ie||flag)return this.getAttribute(property,flag);var node=this.attributes[property];return(node)?node.nodeValue:null;},removeProperty:function(property){var index=Element.Properties[property];if(index)this[index]='';else this.removeAttribute(property);return this;},getProperties:function(){return Element.getMany(this,'getProperty',arguments);},setProperty:function(property,value){var index=Element.Properties[property];if(index)this[index]=value;else this.setAttribute(property,value);return this;},setProperties:function(source){return Element.setMany(this,'setProperty',source);},setHTML:function(){this.innerHTML=$A(arguments).join('');return this;},setText:function(text){var tag=this.getTag();if(['style','script'].contains(tag)){if(window.ie){if(tag=='style')this.styleSheet.cssText=text;else if(tag=='script')this.setProperty('text',text);return this;}else{this.removeChild(this.firstChild);return this.appendText(text);}}
this[$defined(this.innerText)?'innerText':'textContent']=text;return this;},getText:function(){var tag=this.getTag();if(['style','script'].contains(tag)){if(window.ie){if(tag=='style')return this.styleSheet.cssText;else if(tag=='script')return this.getProperty('text');}else{return this.innerHTML;}}
return($pick(this.innerText,this.textContent));},getTag:function(){return this.tagName.toLowerCase();},empty:function(){Garbage.trash(this.getElementsByTagName('*'));return this.setHTML('');}});Element.fixStyle=function(property,result,element){if($chk(parseInt(result)))return result;if(['height','width'].contains(property)){var values=(property=='width')?['left','right']:['top','bottom'];var size=0;values.each(function(value){size+=element.getStyle('border-'+value+'-width').toInt()+element.getStyle('padding-'+value).toInt();});return element['offset'+property.capitalize()]-size+'px';}else if(property.test(/border(.+)Width|margin|padding/)){return'0px';}
return result;};Element.Styles={'border':[],'padding':[],'margin':[]};['Top','Right','Bottom','Left'].each(function(direction){for(var style in Element.Styles)Element.Styles[style].push(style+direction);});Element.borderShort=['borderWidth','borderStyle','borderColor'];Element.getMany=function(el,method,keys){var result={};$each(keys,function(key){result[key]=el[method](key);});return result;};Element.setMany=function(el,method,pairs){for(var key in pairs)el[method](key,pairs[key]);return el;};Element.Properties=new Abstract({'class':'className','for':'htmlFor','colspan':'colSpan','rowspan':'rowSpan','accesskey':'accessKey','tabindex':'tabIndex','maxlength':'maxLength','readonly':'readOnly','frameborder':'frameBorder','value':'value','disabled':'disabled','checked':'checked','multiple':'multiple','selected':'selected'});Element.PropertiesIFlag={'href':2,'src':2};Element.Methods={Listeners:{addListener:function(type,fn){if(this.addEventListener)this.addEventListener(type,fn,false);else this.attachEvent('on'+type,fn);return this;},removeListener:function(type,fn){if(this.removeEventListener)this.removeEventListener(type,fn,false);else this.detachEvent('on'+type,fn);return this;}}};window.extend(Element.Methods.Listeners);document.extend(Element.Methods.Listeners);Element.extend(Element.Methods.Listeners);var Garbage={elements:[],collect:function(el){if(!el.$tmp){Garbage.elements.push(el);el.$tmp={'opacity':1};}
return el;},trash:function(elements){for(var i=0,j=elements.length,el;i<j;i++){if(!(el=elements[i])||!el.$tmp)continue;if(el.$events)el.fireEvent('trash').removeEvents();for(var p in el.$tmp)el.$tmp[p]=null;for(var d in Element.prototype)el[d]=null;Garbage.elements[Garbage.elements.indexOf(el)]=null;el.htmlElement=el.$tmp=el=null;}
Garbage.elements.remove(null);},empty:function(){Garbage.collect(window);Garbage.collect(document);Garbage.trash(Garbage.elements);}};window.addListener('beforeunload',function(){window.addListener('unload',Garbage.empty);if(window.ie)window.addListener('unload',CollectGarbage);});var Event=new Class({initialize:function(event){if(event&&event.$extended)return event;this.$extended=true;event=event||window.event;this.event=event;this.type=event.type;this.target=event.target||event.srcElement;if(this.target.nodeType==3)this.target=this.target.parentNode;this.shift=event.shiftKey;this.control=event.ctrlKey;this.alt=event.altKey;this.meta=event.metaKey;if(['DOMMouseScroll','mousewheel'].contains(this.type)){this.wheel=(event.wheelDelta)?event.wheelDelta/120:-(event.detail||0)/3;}else if(this.type.contains('key')){this.code=event.which||event.keyCode;for(var name in Event.keys){if(Event.keys[name]==this.code){this.key=name;break;}}
if(this.type=='keydown'){var fKey=this.code-111;if(fKey>0&&fKey<13)this.key='f'+fKey;}
this.key=this.key||String.fromCharCode(this.code).toLowerCase();}else if(this.type.test(/(click|mouse|menu)/)){this.page={'x':event.pageX||event.clientX+document.documentElement.scrollLeft,'y':event.pageY||event.clientY+document.documentElement.scrollTop};this.client={'x':event.pageX?event.pageX-window.pageXOffset:event.clientX,'y':event.pageY?event.pageY-window.pageYOffset:event.clientY};this.rightClick=(event.which==3)||(event.button==2);switch(this.type){case'mouseover':this.relatedTarget=event.relatedTarget||event.fromElement;break;case'mouseout':this.relatedTarget=event.relatedTarget||event.toElement;}
this.fixRelatedTarget();}
return this;},stop:function(){return this.stopPropagation().preventDefault();},stopPropagation:function(){if(this.event.stopPropagation)this.event.stopPropagation();else this.event.cancelBubble=true;return this;},preventDefault:function(){if(this.event.preventDefault)this.event.preventDefault();else this.event.returnValue=false;return this;}});Event.fix={relatedTarget:function(){if(this.relatedTarget&&this.relatedTarget.nodeType==3)this.relatedTarget=this.relatedTarget.parentNode;},relatedTargetGecko:function(){try{Event.fix.relatedTarget.call(this);}catch(e){this.relatedTarget=this.target;}}};Event.prototype.fixRelatedTarget=(window.gecko)?Event.fix.relatedTargetGecko:Event.fix.relatedTarget;Event.keys=new Abstract({'enter':13,'up':38,'down':40,'left':37,'right':39,'esc':27,'space':32,'backspace':8,'tab':9,'delete':46});Element.Methods.Events={addEvent:function(type,fn){this.$events=this.$events||{};this.$events[type]=this.$events[type]||{'keys':[],'values':[]};if(this.$events[type].keys.contains(fn))return this;this.$events[type].keys.push(fn);var realType=type;var custom=Element.Events[type];if(custom){if(custom.add)custom.add.call(this,fn);if(custom.map)fn=custom.map;if(custom.type)realType=custom.type;}
if(!this.addEventListener)fn=fn.create({'bind':this,'event':true});this.$events[type].values.push(fn);return(Element.NativeEvents.contains(realType))?this.addListener(realType,fn):this;},removeEvent:function(type,fn){if(!this.$events||!this.$events[type])return this;var pos=this.$events[type].keys.indexOf(fn);if(pos==-1)return this;var key=this.$events[type].keys.splice(pos,1)[0];var value=this.$events[type].values.splice(pos,1)[0];var custom=Element.Events[type];if(custom){if(custom.remove)custom.remove.call(this,fn);if(custom.type)type=custom.type;}
return(Element.NativeEvents.contains(type))?this.removeListener(type,value):this;},addEvents:function(source){return Element.setMany(this,'addEvent',source);},removeEvents:function(type){if(!this.$events)return this;if(!type){for(var evType in this.$events)this.removeEvents(evType);this.$events=null;}else if(this.$events[type]){this.$events[type].keys.each(function(fn){this.removeEvent(type,fn);},this);this.$events[type]=null;}
return this;},fireEvent:function(type,args,delay){if(this.$events&&this.$events[type]){this.$events[type].keys.each(function(fn){fn.create({'bind':this,'delay':delay,'arguments':args})();},this);}
return this;},cloneEvents:function(from,type){if(!from.$events)return this;if(!type){for(var evType in from.$events)this.cloneEvents(from,evType);}else if(from.$events[type]){from.$events[type].keys.each(function(fn){this.addEvent(type,fn);},this);}
return this;}};window.extend(Element.Methods.Events);document.extend(Element.Methods.Events);Element.extend(Element.Methods.Events);Element.Events=new Abstract({'mouseenter':{type:'mouseover',map:function(event){event=new Event(event);if(event.relatedTarget!=this&&!this.hasChild(event.relatedTarget))this.fireEvent('mouseenter',event);}},'mouseleave':{type:'mouseout',map:function(event){event=new Event(event);if(event.relatedTarget!=this&&!this.hasChild(event.relatedTarget))this.fireEvent('mouseleave',event);}},'mousewheel':{type:(window.gecko)?'DOMMouseScroll':'mousewheel'}});Element.NativeEvents=['click','dblclick','mouseup','mousedown','mousewheel','DOMMouseScroll','mouseover','mouseout','mousemove','keydown','keypress','keyup','load','unload','beforeunload','resize','move','focus','blur','change','submit','reset','select','error','abort','contextmenu','scroll'];Function.extend({bindWithEvent:function(bind,args){return this.create({'bind':bind,'arguments':args,'event':Event});}});Elements.extend({filterByTag:function(tag){return new Elements(this.filter(function(el){return(Element.getTag(el)==tag);}));},filterByClass:function(className,nocash){var elements=this.filter(function(el){return(el.className&&el.className.contains(className,' '));});return(nocash)?elements:new Elements(elements);},filterById:function(id,nocash){var elements=this.filter(function(el){return(el.id==id);});return(nocash)?elements:new Elements(elements);},filterByAttribute:function(name,operator,value,nocash){var elements=this.filter(function(el){var current=Element.getProperty(el,name);if(!current)return false;if(!operator)return true;switch(operator){case'=':return(current==value);case'*=':return(current.contains(value));case'^=':return(current.substr(0,value.length)==value);case'$=':return(current.substr(current.length-value.length)==value);case'!=':return(current!=value);case'~=':return current.contains(value,' ');}
return false;});return(nocash)?elements:new Elements(elements);}});function $E(selector,filter){return($(filter)||document).getElement(selector);};function $ES(selector,filter){return($(filter)||document).getElementsBySelector(selector);};$$.shared={'regexp':/^(\w*|\*)(?:#([\w-]+)|\.([\w-]+))?(?:\[(\w+)(?:([!*^$]?=)["']?([^"'\]]*)["']?)?])?$/,'xpath':{getParam:function(items,context,param,i){var temp=[context.namespaceURI?'xhtml:':'',param[1]];if(param[2])temp.push('[@id="',param[2],'"]');if(param[3])temp.push('[contains(concat(" ", @class, " "), " ',param[3],' ")]');if(param[4]){if(param[5]&&param[6]){switch(param[5]){case'*=':temp.push('[contains(@',param[4],', "',param[6],'")]');break;case'^=':temp.push('[starts-with(@',param[4],', "',param[6],'")]');break;case'$=':temp.push('[substring(@',param[4],', string-length(@',param[4],') - ',param[6].length,' + 1) = "',param[6],'"]');break;case'=':temp.push('[@',param[4],'="',param[6],'"]');break;case'!=':temp.push('[@',param[4],'!="',param[6],'"]');}}else{temp.push('[@',param[4],']');}}
items.push(temp.join(''));return items;},getItems:function(items,context,nocash){var elements=[];var xpath=document.evaluate('.//'+items.join('//'),context,$$.shared.resolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);for(var i=0,j=xpath.snapshotLength;i<j;i++)elements.push(xpath.snapshotItem(i));return(nocash)?elements:new Elements(elements.map($));}},'normal':{getParam:function(items,context,param,i){if(i==0){if(param[2]){var el=context.getElementById(param[2]);if(!el||((param[1]!='*')&&(Element.getTag(el)!=param[1])))return false;items=[el];}else{items=$A(context.getElementsByTagName(param[1]));}}else{items=$$.shared.getElementsByTagName(items,param[1]);if(param[2])items=Elements.filterById(items,param[2],true);}
if(param[3])items=Elements.filterByClass(items,param[3],true);if(param[4])items=Elements.filterByAttribute(items,param[4],param[5],param[6],true);return items;},getItems:function(items,context,nocash){return(nocash)?items:$$.unique(items);}},resolver:function(prefix){return(prefix=='xhtml')?'http://www.w3.org/1999/xhtml':false;},getElementsByTagName:function(context,tagName){var found=[];for(var i=0,j=context.length;i<j;i++)found.extend(context[i].getElementsByTagName(tagName));return found;}};$$.shared.method=(window.xpath)?'xpath':'normal';Element.Methods.Dom={getElements:function(selector,nocash){var items=[];selector=selector.trim().split(' ');for(var i=0,j=selector.length;i<j;i++){var sel=selector[i];var param=sel.match($$.shared.regexp);if(!param)break;param[1]=param[1]||'*';var temp=$$.shared[$$.shared.method].getParam(items,this,param,i);if(!temp)break;items=temp;}
return $$.shared[$$.shared.method].getItems(items,this,nocash);},getElement:function(selector){return $(this.getElements(selector,true)[0]||false);},getElementsBySelector:function(selector,nocash){var elements=[];selector=selector.split(',');for(var i=0,j=selector.length;i<j;i++)elements=elements.concat(this.getElements(selector[i],true));return(nocash)?elements:$$.unique(elements);}};Element.extend({getElementById:function(id){var el=document.getElementById(id);if(!el)return false;for(var parent=el.parentNode;parent!=this;parent=parent.parentNode){if(!parent)return false;}
return el;},getElementsByClassName:function(className){return this.getElements('.'+className);}});document.extend(Element.Methods.Dom);Element.extend(Element.Methods.Dom);Element.extend({getValue:function(){switch(this.getTag()){case'select':var values=[];$each(this.options,function(option){if(option.selected)values.push($pick(option.value,option.text));});return(this.multiple)?values:values[0];case'input':if(!(this.checked&&['checkbox','radio'].contains(this.type))&&!['hidden','text','password'].contains(this.type))break;case'textarea':return this.value;}
return false;},getFormElements:function(){return $$(this.getElementsByTagName('input'),this.getElementsByTagName('select'),this.getElementsByTagName('textarea'));},toQueryString:function(){var queryString=[];this.getFormElements().each(function(el){var name=el.name;var value=el.getValue();if(value===false||!name||el.disabled)return;var qs=function(val){queryString.push(name+'='+encodeURIComponent(val));};if($type(value)=='array')value.each(qs);else qs(value);});return queryString.join('&');}});Element.extend({scrollTo:function(x,y){this.scrollLeft=x;this.scrollTop=y;},getSize:function(){return{'scroll':{'x':this.scrollLeft,'y':this.scrollTop},'size':{'x':this.offsetWidth,'y':this.offsetHeight},'scrollSize':{'x':this.scrollWidth,'y':this.scrollHeight}};},getPosition:function(overflown){overflown=overflown||[];var el=this,left=0,top=0;do{left+=el.offsetLeft||0;top+=el.offsetTop||0;el=el.offsetParent;}while(el);overflown.each(function(element){left-=element.scrollLeft||0;top-=element.scrollTop||0;});return{'x':left,'y':top};},getTop:function(overflown){return this.getPosition(overflown).y;},getLeft:function(overflown){return this.getPosition(overflown).x;},getCoordinates:function(overflown){var position=this.getPosition(overflown);var obj={'width':this.offsetWidth,'height':this.offsetHeight,'left':position.x,'top':position.y};obj.right=obj.left+obj.width;obj.bottom=obj.top+obj.height;return obj;}});Element.Events.domready={add:function(fn){if(window.loaded){fn.call(this);return;}
var domReady=function(){if(window.loaded)return;window.loaded=true;window.timer=$clear(window.timer);this.fireEvent('domready');}.bind(this);if(document.readyState&&window.webkit){window.timer=function(){if(['loaded','complete'].contains(document.readyState))domReady();}.periodical(50);}else if(document.readyState&&window.ie){if(!$('ie_ready')){var src=(window.location.protocol=='https:')?'://0':'javascript:void(0)';document.write('<script id="ie_ready" defer src="'+src+'"><\/script>');$('ie_ready').onreadystatechange=function(){if(this.readyState=='complete')domReady();};}}else{window.addListener("load",domReady);document.addListener("DOMContentLoaded",domReady);}}};window.onDomReady=function(fn){return this.addEvent('domready',fn);};window.extend({getWidth:function(){if(this.webkit419)return this.innerWidth;if(this.opera)return document.body.clientWidth;return document.documentElement.clientWidth;},getHeight:function(){if(this.webkit419)return this.innerHeight;if(this.opera)return document.body.clientHeight;return document.documentElement.clientHeight;},getScrollWidth:function(){if(this.ie)return Math.max(document.documentElement.offsetWidth,document.documentElement.scrollWidth);if(this.webkit)return document.body.scrollWidth;return document.documentElement.scrollWidth;},getScrollHeight:function(){if(this.ie)return Math.max(document.documentElement.offsetHeight,document.documentElement.scrollHeight);if(this.webkit)return document.body.scrollHeight;return document.documentElement.scrollHeight;},getScrollLeft:function(){return this.pageXOffset||document.documentElement.scrollLeft;},getScrollTop:function(){return this.pageYOffset||document.documentElement.scrollTop;},getSize:function(){return{'size':{'x':this.getWidth(),'y':this.getHeight()},'scrollSize':{'x':this.getScrollWidth(),'y':this.getScrollHeight()},'scroll':{'x':this.getScrollLeft(),'y':this.getScrollTop()}};},getPosition:function(){return{'x':0,'y':0};}});var Fx={};Fx.Base=new Class({options:{onStart:Class.empty,onComplete:Class.empty,onCancel:Class.empty,transition:function(p){return-(Math.cos(Math.PI*p)-1)/2;},duration:500,unit:'px',wait:true,fps:50},initialize:function(options){this.element=this.element||null;this.setOptions(options);if(this.options.initialize)this.options.initialize.call(this);},step:function(){var time=$time();if(time<this.time+this.options.duration){this.delta=this.options.transition((time-this.time)/this.options.duration);this.setNow();this.increase();}else{this.stop(true);this.set(this.to);this.fireEvent('onComplete',this.element,10);this.callChain();}},set:function(to){this.now=to;this.increase();return this;},setNow:function(){this.now=this.compute(this.from,this.to);},compute:function(from,to){return(to-from)*this.delta+from;},start:function(from,to){if(!this.options.wait)this.stop();else if(this.timer)return this;this.from=from;this.to=to;this.change=this.to-this.from;this.time=$time();this.timer=this.step.periodical(Math.round(1000/this.options.fps),this);this.fireEvent('onStart',this.element);return this;},stop:function(end){if(!this.timer)return this;this.timer=$clear(this.timer);if(!end)this.fireEvent('onCancel',this.element);return this;},custom:function(from,to){return this.start(from,to);},clearTimer:function(end){return this.stop(end);}});Fx.Base.implement(new Chain,new Events,new Options);Fx.CSS={select:function(property,to){if(property.test(/color/i))return this.Color;var type=$type(to);if((type=='array')||(type=='string'&&to.contains(' ')))return this.Multi;return this.Single;},parse:function(el,property,fromTo){if(!fromTo.push)fromTo=[fromTo];var from=fromTo[0],to=fromTo[1];if(!$chk(to)){to=from;from=el.getStyle(property);}
var css=this.select(property,to);return{'from':css.parse(from),'to':css.parse(to),'css':css};}};Fx.CSS.Single={parse:function(value){return parseFloat(value);},getNow:function(from,to,fx){return fx.compute(from,to);},getValue:function(value,unit,property){if(unit=='px'&&property!='opacity')value=Math.round(value);return value+unit;}};Fx.CSS.Multi={parse:function(value){return value.push?value:value.split(' ').map(function(v){return parseFloat(v);});},getNow:function(from,to,fx){var now=[];for(var i=0;i<from.length;i++)now[i]=fx.compute(from[i],to[i]);return now;},getValue:function(value,unit,property){if(unit=='px'&&property!='opacity')value=value.map(Math.round);return value.join(unit+' ')+unit;}};Fx.CSS.Color={parse:function(value){return value.push?value:value.hexToRgb(true);},getNow:function(from,to,fx){var now=[];for(var i=0;i<from.length;i++)now[i]=Math.round(fx.compute(from[i],to[i]));return now;},getValue:function(value){return'rgb('+value.join(',')+')';}};Fx.Style=Fx.Base.extend({initialize:function(el,property,options){this.element=$(el);this.property=property;this.parent(options);},hide:function(){return this.set(0);},setNow:function(){this.now=this.css.getNow(this.from,this.to,this);},set:function(to){this.css=Fx.CSS.select(this.property,to);return this.parent(this.css.parse(to));},start:function(from,to){if(this.timer&&this.options.wait)return this;var parsed=Fx.CSS.parse(this.element,this.property,[from,to]);this.css=parsed.css;return this.parent(parsed.from,parsed.to);},increase:function(){this.element.setStyle(this.property,this.css.getValue(this.now,this.options.unit,this.property));}});Element.extend({effect:function(property,options){return new Fx.Style(this,property,options);}});Fx.Styles=Fx.Base.extend({initialize:function(el,options){this.element=$(el);this.parent(options);},setNow:function(){for(var p in this.from)this.now[p]=this.css[p].getNow(this.from[p],this.to[p],this);},set:function(to){var parsed={};this.css={};for(var p in to){this.css[p]=Fx.CSS.select(p,to[p]);parsed[p]=this.css[p].parse(to[p]);}
return this.parent(parsed);},start:function(obj){if(this.timer&&this.options.wait)return this;this.now={};this.css={};var from={},to={};for(var p in obj){var parsed=Fx.CSS.parse(this.element,p,obj[p]);from[p]=parsed.from;to[p]=parsed.to;this.css[p]=parsed.css;}
return this.parent(from,to);},increase:function(){for(var p in this.now)this.element.setStyle(p,this.css[p].getValue(this.now[p],this.options.unit,p));}});Element.extend({effects:function(options){return new Fx.Styles(this,options);}});Fx.Elements=Fx.Base.extend({initialize:function(elements,options){this.elements=$$(elements);this.parent(options);},setNow:function(){for(var i in this.from){var iFrom=this.from[i],iTo=this.to[i],iCss=this.css[i],iNow=this.now[i]={};for(var p in iFrom)iNow[p]=iCss[p].getNow(iFrom[p],iTo[p],this);}},set:function(to){var parsed={};this.css={};for(var i in to){var iTo=to[i],iCss=this.css[i]={},iParsed=parsed[i]={};for(var p in iTo){iCss[p]=Fx.CSS.select(p,iTo[p]);iParsed[p]=iCss[p].parse(iTo[p]);}}
return this.parent(parsed);},start:function(obj){if(this.timer&&this.options.wait)return this;this.now={};this.css={};var from={},to={};for(var i in obj){var iProps=obj[i],iFrom=from[i]={},iTo=to[i]={},iCss=this.css[i]={};for(var p in iProps){var parsed=Fx.CSS.parse(this.elements[i],p,iProps[p]);iFrom[p]=parsed.from;iTo[p]=parsed.to;iCss[p]=parsed.css;}}
return this.parent(from,to);},increase:function(){for(var i in this.now){var iNow=this.now[i],iCss=this.css[i];for(var p in iNow)this.elements[i].setStyle(p,iCss[p].getValue(iNow[p],this.options.unit,p));}}});Fx.Scroll=Fx.Base.extend({options:{overflown:[],offset:{'x':0,'y':0},wheelStops:true},initialize:function(element,options){this.now=[];this.element=$(element);this.bound={'stop':this.stop.bind(this,false)};this.parent(options);if(this.options.wheelStops){this.addEvent('onStart',function(){document.addEvent('mousewheel',this.bound.stop);}.bind(this));this.addEvent('onComplete',function(){document.removeEvent('mousewheel',this.bound.stop);}.bind(this));}},setNow:function(){for(var i=0;i<2;i++)this.now[i]=this.compute(this.from[i],this.to[i]);},scrollTo:function(x,y){if(this.timer&&this.options.wait)return this;var el=this.element.getSize();var values={'x':x,'y':y};for(var z in el.size){var max=el.scrollSize[z]-el.size[z];if($chk(values[z]))values[z]=($type(values[z])=='number')?values[z].limit(0,max):max;else values[z]=el.scroll[z];values[z]+=this.options.offset[z];}
return this.start([el.scroll.x,el.scroll.y],[values.x,values.y]);},toTop:function(){return this.scrollTo(false,0);},toBottom:function(){return this.scrollTo(false,'full');},toLeft:function(){return this.scrollTo(0,false);},toRight:function(){return this.scrollTo('full',false);},toElement:function(el){var parent=this.element.getPosition(this.options.overflown);var target=$(el).getPosition(this.options.overflown);return this.scrollTo(target.x-parent.x,target.y-parent.y);},increase:function(){this.element.scrollTo(this.now[0],this.now[1]);}});Fx.Slide=Fx.Base.extend({options:{mode:'vertical'},initialize:function(el,options){this.element=$(el);this.wrapper=new Element('div',{'styles':$extend(this.element.getStyles('margin'),{'overflow':'hidden'})}).injectAfter(this.element).adopt(this.element);this.element.setStyle('margin',0);this.setOptions(options);this.now=[];this.parent(this.options);this.open=true;this.addEvent('onComplete',function(){this.open=(this.now[0]===0);});if(window.webkit419)this.addEvent('onComplete',function(){if(this.open)this.element.remove().inject(this.wrapper);});},setNow:function(){for(var i=0;i<2;i++)this.now[i]=this.compute(this.from[i],this.to[i]);},vertical:function(){this.margin='margin-top';this.layout='height';this.offset=this.element.offsetHeight;},horizontal:function(){this.margin='margin-left';this.layout='width';this.offset=this.element.offsetWidth;},slideIn:function(mode){this[mode||this.options.mode]();return this.start([this.element.getStyle(this.margin).toInt(),this.wrapper.getStyle(this.layout).toInt()],[0,this.offset]);},slideOut:function(mode){this[mode||this.options.mode]();return this.start([this.element.getStyle(this.margin).toInt(),this.wrapper.getStyle(this.layout).toInt()],[-this.offset,0]);},hide:function(mode){this[mode||this.options.mode]();this.open=false;return this.set([-this.offset,0]);},show:function(mode){this[mode||this.options.mode]();this.open=true;return this.set([0,this.offset]);},toggle:function(mode){if(this.wrapper.offsetHeight==0||this.wrapper.offsetWidth==0)return this.slideIn(mode);return this.slideOut(mode);},increase:function(){this.element.setStyle(this.margin,this.now[0]+this.options.unit);this.wrapper.setStyle(this.layout,this.now[1]+this.options.unit);}});Fx.Transition=function(transition,params){params=params||[];if($type(params)!='array')params=[params];return $extend(transition,{easeIn:function(pos){return transition(pos,params);},easeOut:function(pos){return 1-transition(1-pos,params);},easeInOut:function(pos){return(pos<=0.5)?transition(2*pos,params)/2:(2-transition(2*(1-pos),params))/2;}});};Fx.Transitions=new Abstract({linear:function(p){return p;}});Fx.Transitions.extend=function(transitions){for(var transition in transitions){Fx.Transitions[transition]=new Fx.Transition(transitions[transition]);Fx.Transitions.compat(transition);}};Fx.Transitions.compat=function(transition){['In','Out','InOut'].each(function(easeType){Fx.Transitions[transition.toLowerCase()+easeType]=Fx.Transitions[transition]['ease'+easeType];});};Fx.Transitions.extend({Pow:function(p,x){return Math.pow(p,x[0]||6);},Expo:function(p){return Math.pow(2,8*(p-1));},Circ:function(p){return 1-Math.sin(Math.acos(p));},Sine:function(p){return 1-Math.sin((1-p)*Math.PI/2);},Back:function(p,x){x=x[0]||1.618;return Math.pow(p,2)*((x+1)*p-x);},Bounce:function(p){var value;for(var a=0,b=1;1;a+=b,b/=2){if(p>=(7-4*a)/11){value=-Math.pow((11-6*a-11*p)/4,2)+b*b;break;}}
return value;},Elastic:function(p,x){return Math.pow(2,10*--p)*Math.cos(20*p*Math.PI*(x[0]||1)/3);}});['Quad','Cubic','Quart','Quint'].each(function(transition,i){Fx.Transitions[transition]=new Fx.Transition(function(p){return Math.pow(p,[i+2]);});Fx.Transitions.compat(transition);});var Drag={};Drag.Base=new Class({options:{handle:false,unit:'px',onStart:Class.empty,onBeforeStart:Class.empty,onComplete:Class.empty,onSnap:Class.empty,onDrag:Class.empty,limit:false,modifiers:{x:'left',y:'top'},grid:false,snap:6},initialize:function(el,options){this.setOptions(options);this.element=$(el);this.handle=$(this.options.handle)||this.element;this.mouse={'now':{},'pos':{}};this.value={'start':{},'now':{}};this.bound={'start':this.start.bindWithEvent(this),'check':this.check.bindWithEvent(this),'drag':this.drag.bindWithEvent(this),'stop':this.stop.bind(this)};this.attach();if(this.options.initialize)this.options.initialize.call(this);},attach:function(){this.handle.addEvent('mousedown',this.bound.start);return this;},detach:function(){this.handle.removeEvent('mousedown',this.bound.start);return this;},start:function(event){this.fireEvent('onBeforeStart',this.element);this.mouse.start=event.page;var limit=this.options.limit;this.limit={'x':[],'y':[]};for(var z in this.options.modifiers){if(!this.options.modifiers[z])continue;this.value.now[z]=this.element.getStyle(this.options.modifiers[z]).toInt();this.mouse.pos[z]=event.page[z]-this.value.now[z];if(limit&&limit[z]){for(var i=0;i<2;i++){if($chk(limit[z][i]))this.limit[z][i]=($type(limit[z][i])=='function')?limit[z][i]():limit[z][i];}}}
if($type(this.options.grid)=='number')this.options.grid={'x':this.options.grid,'y':this.options.grid};document.addListener('mousemove',this.bound.check);document.addListener('mouseup',this.bound.stop);this.fireEvent('onStart',this.element);event.stop();},check:function(event){var distance=Math.round(Math.sqrt(Math.pow(event.page.x-this.mouse.start.x,2)+Math.pow(event.page.y-this.mouse.start.y,2)));if(distance>this.options.snap){document.removeListener('mousemove',this.bound.check);document.addListener('mousemove',this.bound.drag);this.drag(event);this.fireEvent('onSnap',this.element);}
event.stop();},drag:function(event){this.out=false;this.mouse.now=event.page;for(var z in this.options.modifiers){if(!this.options.modifiers[z])continue;this.value.now[z]=this.mouse.now[z]-this.mouse.pos[z];if(this.limit[z]){if($chk(this.limit[z][1])&&(this.value.now[z]>this.limit[z][1])){this.value.now[z]=this.limit[z][1];this.out=true;}else if($chk(this.limit[z][0])&&(this.value.now[z]<this.limit[z][0])){this.value.now[z]=this.limit[z][0];this.out=true;}}
if(this.options.grid[z])this.value.now[z]-=(this.value.now[z]%this.options.grid[z]);this.element.setStyle(this.options.modifiers[z],this.value.now[z]+this.options.unit);}
this.fireEvent('onDrag',this.element);event.stop();},stop:function(){document.removeListener('mousemove',this.bound.check);document.removeListener('mousemove',this.bound.drag);document.removeListener('mouseup',this.bound.stop);this.fireEvent('onComplete',this.element);}});Drag.Base.implement(new Events,new Options);Element.extend({makeResizable:function(options){return new Drag.Base(this,$merge({modifiers:{x:'width',y:'height'}},options));}});Drag.Move=Drag.Base.extend({options:{droppables:[],container:false,overflown:[]},initialize:function(el,options){this.setOptions(options);this.element=$(el);this.droppables=$$(this.options.droppables);this.container=$(this.options.container);this.position={'element':this.element.getStyle('position'),'container':false};if(this.container)this.position.container=this.container.getStyle('position');if(!['relative','absolute','fixed'].contains(this.position.element))this.position.element='absolute';var top=this.element.getStyle('top').toInt();var left=this.element.getStyle('left').toInt();if(this.position.element=='absolute'&&!['relative','absolute','fixed'].contains(this.position.container)){top=$chk(top)?top:this.element.getTop(this.options.overflown);left=$chk(left)?left:this.element.getLeft(this.options.overflown);}else{top=$chk(top)?top:0;left=$chk(left)?left:0;}
this.element.setStyles({'top':top,'left':left,'position':this.position.element});this.parent(this.element);},start:function(event){this.overed=null;if(this.container){var cont=this.container.getCoordinates();var el=this.element.getCoordinates();if(this.position.element=='absolute'&&!['relative','absolute','fixed'].contains(this.position.container)){this.options.limit={'x':[cont.left,cont.right-el.width],'y':[cont.top,cont.bottom-el.height]};}else{this.options.limit={'y':[0,cont.height-el.height],'x':[0,cont.width-el.width]};}}
this.parent(event);},drag:function(event){this.parent(event);var overed=this.out?false:this.droppables.filter(this.checkAgainst,this).getLast();if(this.overed!=overed){if(this.overed)this.overed.fireEvent('leave',[this.element,this]);this.overed=overed?overed.fireEvent('over',[this.element,this]):null;}
return this;},checkAgainst:function(el){el=el.getCoordinates(this.options.overflown);var now=this.mouse.now;return(now.x>el.left&&now.x<el.right&&now.y<el.bottom&&now.y>el.top);},stop:function(){if(this.overed&&!this.out)this.overed.fireEvent('drop',[this.element,this]);else this.element.fireEvent('emptydrop',this);this.parent();return this;}});Element.extend({makeDraggable:function(options){return new Drag.Move(this,options);}});var XHR=new Class({options:{method:'post',async:true,onRequest:Class.empty,onSuccess:Class.empty,onFailure:Class.empty,urlEncoded:true,encoding:'utf-8',autoCancel:false,headers:{}},setTransport:function(){this.transport=(window.XMLHttpRequest)?new XMLHttpRequest():(window.ie?new ActiveXObject('Microsoft.XMLHTTP'):false);return this;},initialize:function(options){this.setTransport().setOptions(options);this.options.isSuccess=this.options.isSuccess||this.isSuccess;this.headers={};if(this.options.urlEncoded&&this.options.method=='post'){var encoding=(this.options.encoding)?'; charset='+this.options.encoding:'';this.setHeader('Content-type','application/x-www-form-urlencoded'+encoding);}
if(this.options.initialize)this.options.initialize.call(this);},onStateChange:function(){if(this.transport.readyState!=4||!this.running)return;this.running=false;var status=0;try{status=this.transport.status;}catch(e){};if(this.options.isSuccess.call(this,status))this.onSuccess();else this.onFailure();this.transport.onreadystatechange=Class.empty;},isSuccess:function(status){return((status>=200)&&(status<300));},onSuccess:function(){this.response={'text':this.transport.responseText,'xml':this.transport.responseXML};this.fireEvent('onSuccess',[this.response.text,this.response.xml]);this.callChain();},onFailure:function(){this.fireEvent('onFailure',this.transport);},setHeader:function(name,value){this.headers[name]=value;return this;},send:function(url,data){if(this.options.autoCancel)this.cancel();else if(this.running)return this;this.running=true;if(data&&this.options.method=='get'){url=url+(url.contains('?')?'&':'?')+data;data=null;}
this.transport.open(this.options.method.toUpperCase(),url,this.options.async);this.transport.onreadystatechange=this.onStateChange.bind(this);if((this.options.method=='post')&&this.transport.overrideMimeType)this.setHeader('Connection','close');$extend(this.headers,this.options.headers);for(var type in this.headers)try{this.transport.setRequestHeader(type,this.headers[type]);}catch(e){};this.fireEvent('onRequest');this.transport.send($pick(data,null));return this;},cancel:function(){if(!this.running)return this;this.running=false;this.transport.abort();this.transport.onreadystatechange=Class.empty;this.setTransport();this.fireEvent('onCancel');return this;}});XHR.implement(new Chain,new Events,new Options);var Ajax=XHR.extend({options:{data:null,update:null,onComplete:Class.empty,evalScripts:false,evalResponse:false},initialize:function(url,options){this.addEvent('onSuccess',this.onComplete);this.setOptions(options);this.options.data=this.options.data||this.options.postBody;if(!['post','get'].contains(this.options.method)){this._method='_method='+this.options.method;this.options.method='post';}
this.parent();this.setHeader('X-Requested-With','XMLHttpRequest');this.setHeader('Accept','text/javascript, text/html, application/xml, text/xml, */*');this.url=url;},onComplete:function(){if(this.options.update)$(this.options.update).empty().setHTML(this.response.text);if(this.options.evalScripts||this.options.evalResponse)this.evalScripts();this.fireEvent('onComplete',[this.response.text,this.response.xml],20);},request:function(data){data=data||this.options.data;switch($type(data)){case'element':data=$(data).toQueryString();break;case'object':data=Object.toQueryString(data);}
if(this._method)data=(data)?[this._method,data].join('&'):this._method;return this.send(this.url,data);},evalScripts:function(){var script,scripts;if(this.options.evalResponse||(/(ecma|java)script/).test(this.getHeader('Content-type')))scripts=this.response.text;else{scripts=[];var regexp=/<script[^>]*>([\s\S]*?)<\/script>/gi;while((script=regexp.exec(this.response.text)))scripts.push(script[1]);scripts=scripts.join('\n');}
if(scripts)(window.execScript)?window.execScript(scripts):window.setTimeout(scripts,0);},getHeader:function(name){try{return this.transport.getResponseHeader(name);}catch(e){};return null;}});Object.toQueryString=function(source){var queryString=[];for(var property in source)queryString.push(encodeURIComponent(property)+'='+encodeURIComponent(source[property]));return queryString.join('&');};Element.extend({send:function(options){return new Ajax(this.getProperty('action'),$merge({data:this.toQueryString()},options,{method:'post'})).request();}});var Cookie=new Abstract({options:{domain:false,path:false,duration:false,secure:false},set:function(key,value,options){options=$merge(this.options,options);value=encodeURIComponent(value);if(options.domain)value+='; domain='+options.domain;if(options.path)value+='; path='+options.path;if(options.duration){var date=new Date();date.setTime(date.getTime()+options.duration*24*60*60*1000);value+='; expires='+date.toGMTString();}
if(options.secure)value+='; secure';document.cookie=key+'='+value;return $extend(options,{'key':key,'value':value});},get:function(key){var value=document.cookie.match('(?:^|;)\\s*'+key.escapeRegExp()+'=([^;]*)');return value?decodeURIComponent(value[1]):false;},remove:function(cookie,options){if($type(cookie)=='object')this.set(cookie.key,'',$merge(cookie,{duration:-1}));else this.set(cookie,'',$merge(options,{duration:-1}));}});var Json={toString:function(obj){switch($type(obj)){case'string':return'"'+obj.replace(/(["\\])/g,'\\$1')+'"';case'array':return'['+obj.map(Json.toString).join(',')+']';case'object':var string=[];for(var property in obj)string.push(Json.toString(property)+':'+Json.toString(obj[property]));return'{'+string.join(',')+'}';case'number':if(isFinite(obj))break;case false:return'null';}
return String(obj);},evaluate:function(str,secure){return(($type(str)!='string')||(secure&&!str.test(/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/)))?null:eval('('+str+')');}};Json.Remote=XHR.extend({initialize:function(url,options){this.url=url;this.addEvent('onSuccess',this.onComplete);this.parent(options);this.setHeader('X-Request','JSON');},send:function(obj){return this.parent(this.url,'json='+Json.toString(obj));},onComplete:function(){this.fireEvent('onComplete',[Json.evaluate(this.response.text,this.options.secure)]);}});var Asset=new Abstract({javascript:function(source,properties){properties=$merge({'onload':Class.empty},properties);var script=new Element('script',{'src':source}).addEvents({'load':properties.onload,'readystatechange':function(){if(this.readyState=='complete')this.fireEvent('load');}});delete properties.onload;return script.setProperties(properties).inject(document.head);},css:function(source,properties){return new Element('link',$merge({'rel':'stylesheet','media':'screen','type':'text/css','href':source},properties)).inject(document.head);},image:function(source,properties){properties=$merge({'onload':Class.empty,'onabort':Class.empty,'onerror':Class.empty},properties);var image=new Image();image.src=source;var element=new Element('img',{'src':source});['load','abort','error'].each(function(type){var event=properties['on'+type];delete properties['on'+type];element.addEvent(type,function(){this.removeEvent(type,arguments.callee);event.call(this);});});if(image.width&&image.height)element.fireEvent('load',element,1);return element.setProperties(properties);},images:function(sources,options){options=$merge({onComplete:Class.empty,onProgress:Class.empty},options);if(!sources.push)sources=[sources];var images=[];var counter=0;sources.each(function(source){var img=new Asset.image(source,{'onload':function(){options.onProgress.call(this,counter);counter++;if(counter==sources.length)options.onComplete();}});images.push(img);});return new Elements(images);}});var Hash=new Class({length:0,initialize:function(object){this.obj=object||{};this.setLength();},get:function(key){return(this.hasKey(key))?this.obj[key]:null;},hasKey:function(key){return(key in this.obj);},set:function(key,value){if(!this.hasKey(key))this.length++;this.obj[key]=value;return this;},setLength:function(){this.length=0;for(var p in this.obj)this.length++;return this;},remove:function(key){if(this.hasKey(key)){delete this.obj[key];this.length--;}
return this;},each:function(fn,bind){$each(this.obj,fn,bind);},extend:function(obj){$extend(this.obj,obj);return this.setLength();},merge:function(){this.obj=$merge.apply(null,[this.obj].extend(arguments));return this.setLength();},empty:function(){this.obj={};this.length=0;return this;},keys:function(){var keys=[];for(var property in this.obj)keys.push(property);return keys;},values:function(){var values=[];for(var property in this.obj)values.push(this.obj[property]);return values;}});function $H(obj){return new Hash(obj);};Hash.Cookie=Hash.extend({initialize:function(name,options){this.name=name;this.options=$extend({'autoSave':true},options||{});this.load();},save:function(){if(this.length==0){Cookie.remove(this.name,this.options);return true;}
var str=Json.toString(this.obj);if(str.length>4096)return false;Cookie.set(this.name,str,this.options);return true;},load:function(){this.obj=Json.evaluate(Cookie.get(this.name),true)||{};this.setLength();}});Hash.Cookie.Methods={};['extend','set','merge','empty','remove'].each(function(method){Hash.Cookie.Methods[method]=function(){Hash.prototype[method].apply(this,arguments);if(this.options.autoSave)this.save();return this;};});Hash.Cookie.implement(Hash.Cookie.Methods);var Color=new Class({initialize:function(color,type){type=type||(color.push?'rgb':'hex');var rgb,hsb;switch(type){case'rgb':rgb=color;hsb=rgb.rgbToHsb();break;case'hsb':rgb=color.hsbToRgb();hsb=color;break;default:rgb=color.hexToRgb(true);hsb=rgb.rgbToHsb();}
rgb.hsb=hsb;rgb.hex=rgb.rgbToHex();return $extend(rgb,Color.prototype);},mix:function(){var colors=$A(arguments);var alpha=($type(colors[colors.length-1])=='number')?colors.pop():50;var rgb=this.copy();colors.each(function(color){color=new Color(color);for(var i=0;i<3;i++)rgb[i]=Math.round((rgb[i]/100*(100-alpha))+(color[i]/100*alpha));});return new Color(rgb,'rgb');},invert:function(){return new Color(this.map(function(value){return 255-value;}));},setHue:function(value){return new Color([value,this.hsb[1],this.hsb[2]],'hsb');},setSaturation:function(percent){return new Color([this.hsb[0],percent,this.hsb[2]],'hsb');},setBrightness:function(percent){return new Color([this.hsb[0],this.hsb[1],percent],'hsb');}});function $RGB(r,g,b){return new Color([r,g,b],'rgb');};function $HSB(h,s,b){return new Color([h,s,b],'hsb');};Array.extend({rgbToHsb:function(){var red=this[0],green=this[1],blue=this[2];var hue,saturation,brightness;var max=Math.max(red,green,blue),min=Math.min(red,green,blue);var delta=max-min;brightness=max/255;saturation=(max!=0)?delta/max:0;if(saturation==0){hue=0;}else{var rr=(max-red)/delta;var gr=(max-green)/delta;var br=(max-blue)/delta;if(red==max)hue=br-gr;else if(green==max)hue=2+rr-br;else hue=4+gr-rr;hue/=6;if(hue<0)hue++;}
return[Math.round(hue*360),Math.round(saturation*100),Math.round(brightness*100)];},hsbToRgb:function(){var br=Math.round(this[2]/100*255);if(this[1]==0){return[br,br,br];}else{var hue=this[0]%360;var f=hue%60;var p=Math.round((this[2]*(100-this[1]))/10000*255);var q=Math.round((this[2]*(6000-this[1]*f))/600000*255);var t=Math.round((this[2]*(6000-this[1]*(60-f)))/600000*255);switch(Math.floor(hue/60)){case 0:return[br,t,p];case 1:return[q,br,p];case 2:return[p,br,t];case 3:return[p,q,br];case 4:return[t,p,br];case 5:return[br,p,q];}}
return false;}});var Scroller=new Class({options:{area:20,velocity:1,onChange:function(x,y){this.element.scrollTo(x,y);}},initialize:function(element,options){this.setOptions(options);this.element=$(element);this.mousemover=([window,document].contains(element))?$(document.body):this.element;},start:function(){this.coord=this.getCoords.bindWithEvent(this);this.mousemover.addListener('mousemove',this.coord);},stop:function(){this.mousemover.removeListener('mousemove',this.coord);this.timer=$clear(this.timer);},getCoords:function(event){this.page=(this.element==window)?event.client:event.page;if(!this.timer)this.timer=this.scroll.periodical(50,this);},scroll:function(){var el=this.element.getSize();var pos=this.element.getPosition();var change={'x':0,'y':0};for(var z in this.page){if(this.page[z]<(this.options.area+pos[z])&&el.scroll[z]!=0)
change[z]=(this.page[z]-this.options.area-pos[z])*this.options.velocity;else if(this.page[z]+this.options.area>(el.size[z]+pos[z])&&el.scroll[z]+el.size[z]!=el.scrollSize[z])
change[z]=(this.page[z]-el.size[z]+this.options.area-pos[z])*this.options.velocity;}
if(change.y||change.x)this.fireEvent('onChange',[el.scroll.x+change.x,el.scroll.y+change.y]);}});Scroller.implement(new Events,new Options);var Slider=new Class({options:{onChange:Class.empty,onComplete:Class.empty,onTick:function(pos){this.knob.setStyle(this.p,pos);},mode:'horizontal',steps:100,offset:0},initialize:function(el,knob,options){this.element=$(el);this.knob=$(knob);this.setOptions(options);this.previousChange=-1;this.previousEnd=-1;this.step=-1;this.element.addEvent('mousedown',this.clickedElement.bindWithEvent(this));var mod,offset;switch(this.options.mode){case'horizontal':this.z='x';this.p='left';mod={'x':'left','y':false};offset='offsetWidth';break;case'vertical':this.z='y';this.p='top';mod={'x':false,'y':'top'};offset='offsetHeight';}
this.max=this.element[offset]-this.knob[offset]+(this.options.offset*2);this.half=this.knob[offset]/2;this.getPos=this.element['get'+this.p.capitalize()].bind(this.element);this.knob.setStyle('position','relative').setStyle(this.p,-this.options.offset);var lim={};lim[this.z]=[-this.options.offset,this.max-this.options.offset];this.drag=new Drag.Base(this.knob,{limit:lim,modifiers:mod,snap:0,onStart:function(){this.draggedKnob();}.bind(this),onDrag:function(){this.draggedKnob();}.bind(this),onComplete:function(){this.draggedKnob();this.end();}.bind(this)});if(this.options.initialize)this.options.initialize.call(this);},set:function(step){this.step=step.limit(0,this.options.steps);this.checkStep();this.end();this.fireEvent('onTick',this.toPosition(this.step));return this;},clickedElement:function(event){var position=event.page[this.z]-this.getPos()-this.half;position=position.limit(-this.options.offset,this.max-this.options.offset);this.step=this.toStep(position);this.checkStep();this.end();this.fireEvent('onTick',position);},draggedKnob:function(){this.step=this.toStep(this.drag.value.now[this.z]);this.checkStep();},checkStep:function(){if(this.previousChange!=this.step){this.previousChange=this.step;this.fireEvent('onChange',this.step);}},end:function(){if(this.previousEnd!==this.step){this.previousEnd=this.step;this.fireEvent('onComplete',this.step+'');}},toStep:function(position){return Math.round((position+this.options.offset)/this.max*this.options.steps);},toPosition:function(step){return this.max*step/this.options.steps;}});Slider.implement(new Events);Slider.implement(new Options);var SmoothScroll=Fx.Scroll.extend({initialize:function(options){this.parent(window,options);this.links=(this.options.links)?$$(this.options.links):$$(document.links);var location=window.location.href.match(/^[^#]*/)[0]+'#';this.links.each(function(link){if(link.href.indexOf(location)!=0)return;var anchor=link.href.substr(location.length);if(anchor&&$(anchor))this.useLink(link,anchor);},this);if(!window.webkit419)this.addEvent('onComplete',function(){window.location.hash=this.anchor;});},useLink:function(link,anchor){link.addEvent('click',function(event){this.anchor=anchor;this.toElement(anchor);event.stop();}.bindWithEvent(this));}});var Sortables=new Class({options:{handles:false,onStart:Class.empty,onComplete:Class.empty,ghost:true,snap:3,onDragStart:function(element,ghost){ghost.setStyle('opacity',0.7);element.setStyle('opacity',0.7);},onDragComplete:function(element,ghost){element.setStyle('opacity',1);ghost.remove();this.trash.remove();}},initialize:function(list,options){this.setOptions(options);this.list=$(list);this.elements=this.list.getChildren();this.handles=(this.options.handles)?$$(this.options.handles):this.elements;this.bound={'start':[],'moveGhost':this.moveGhost.bindWithEvent(this)};for(var i=0,l=this.handles.length;i<l;i++){this.bound.start[i]=this.start.bindWithEvent(this,this.elements[i]);}
this.attach();if(this.options.initialize)this.options.initialize.call(this);this.bound.move=this.move.bindWithEvent(this);this.bound.end=this.end.bind(this);},attach:function(){this.handles.each(function(handle,i){handle.addEvent('mousedown',this.bound.start[i]);},this);},detach:function(){this.handles.each(function(handle,i){handle.removeEvent('mousedown',this.bound.start[i]);},this);},start:function(event,el){this.active=el;this.coordinates=this.list.getCoordinates();if(this.options.ghost){var position=el.getPosition();this.offset=event.page.y-position.y;this.trash=new Element('div').inject(document.body);this.ghost=el.clone().inject(this.trash).setStyles({'position':'absolute','left':position.x,'top':event.page.y-this.offset});document.addListener('mousemove',this.bound.moveGhost);this.fireEvent('onDragStart',[el,this.ghost]);}
document.addListener('mousemove',this.bound.move);document.addListener('mouseup',this.bound.end);this.fireEvent('onStart',el);event.stop();},moveGhost:function(event){var value=event.page.y-this.offset;value=value.limit(this.coordinates.top,this.coordinates.bottom-this.ghost.offsetHeight);this.ghost.setStyle('top',value);event.stop();},move:function(event){var now=event.page.y;this.previous=this.previous||now;var up=((this.previous-now)>0);var prev=this.active.getPrevious();var next=this.active.getNext();if(prev&&up&&now<prev.getCoordinates().bottom)this.active.injectBefore(prev);if(next&&!up&&now>next.getCoordinates().top)this.active.injectAfter(next);this.previous=now;},serialize:function(converter){return this.list.getChildren().map(converter||function(el){return this.elements.indexOf(el);},this);},end:function(){this.previous=null;document.removeListener('mousemove',this.bound.move);document.removeListener('mouseup',this.bound.end);if(this.options.ghost){document.removeListener('mousemove',this.bound.moveGhost);this.fireEvent('onDragComplete',[this.active,this.ghost]);}
this.fireEvent('onComplete',this.active);}});Sortables.implement(new Events,new Options);var Tips=new Class({options:{onShow:function(tip){tip.setStyle('visibility','visible');},onHide:function(tip){tip.setStyle('visibility','hidden');},maxTitleChars:30,showDelay:100,hideDelay:100,className:'tool',offsets:{'x':16,'y':16},fixed:false},initialize:function(elements,options){this.setOptions(options);this.toolTip=new Element('div',{'class':this.options.className+'-tip','styles':{'position':'absolute','top':'0','left':'0','visibility':'hidden'}}).inject(document.body);this.wrapper=new Element('div').inject(this.toolTip);$$(elements).each(this.build,this);if(this.options.initialize)this.options.initialize.call(this);},build:function(el){el.$tmp.myTitle=(el.href&&el.getTag()=='a')?el.href.replace('http://',''):(el.rel||false);if(el.title){var dual=el.title.split('::');if(dual.length>1){el.$tmp.myTitle=dual[0].trim();el.$tmp.myText=dual[1].trim();}else{el.$tmp.myText=el.title;}
el.removeAttribute('title');}else{el.$tmp.myText=false;}
if(el.$tmp.myTitle&&el.$tmp.myTitle.length>this.options.maxTitleChars)el.$tmp.myTitle=el.$tmp.myTitle.substr(0,this.options.maxTitleChars-1)+"&hellip;";el.addEvent('mouseenter',function(event){this.start(el);if(!this.options.fixed)this.locate(event);else this.position(el);}.bind(this));if(!this.options.fixed)el.addEvent('mousemove',this.locate.bindWithEvent(this));var end=this.end.bind(this);el.addEvent('mouseleave',end);el.addEvent('trash',end);},start:function(el){this.wrapper.empty();if(el.$tmp.myTitle){this.title=new Element('span').inject(new Element('div',{'class':this.options.className+'-title'}).inject(this.wrapper)).setHTML(el.$tmp.myTitle);}
if(el.$tmp.myText){this.text=new Element('span').inject(new Element('div',{'class':this.options.className+'-text'}).inject(this.wrapper)).setHTML(el.$tmp.myText);}
$clear(this.timer);this.timer=this.show.delay(this.options.showDelay,this);},end:function(event){$clear(this.timer);this.timer=this.hide.delay(this.options.hideDelay,this);},position:function(element){var pos=element.getPosition();this.toolTip.setStyles({'left':pos.x+this.options.offsets.x,'top':pos.y+this.options.offsets.y});},locate:function(event){var win={'x':window.getWidth(),'y':window.getHeight()};var scroll={'x':window.getScrollLeft(),'y':window.getScrollTop()};var tip={'x':this.toolTip.offsetWidth,'y':this.toolTip.offsetHeight};var prop={'x':'left','y':'top'};for(var z in prop){var pos=event.page[z]+this.options.offsets[z];if((pos+tip[z]-scroll[z])>win[z])pos=event.page[z]-this.options.offsets[z]-tip[z];this.toolTip.setStyle(prop[z],pos);};},show:function(){if(this.options.timeout)this.timer=this.hide.delay(this.options.timeout,this);this.fireEvent('onShow',[this.toolTip]);},hide:function(){this.fireEvent('onHide',[this.toolTip]);}});Tips.implement(new Events,new Options);var Group=new Class({initialize:function(){this.instances=$A(arguments);this.events={};this.checker={};},addEvent:function(type,fn){this.checker[type]=this.checker[type]||{};this.events[type]=this.events[type]||[];if(this.events[type].contains(fn))return false;else this.events[type].push(fn);this.instances.each(function(instance,i){instance.addEvent(type,this.check.bind(this,[type,instance,i]));},this);return this;},check:function(type,instance,i){this.checker[type][i]=true;var every=this.instances.every(function(current,j){return this.checker[type][j]||false;},this);if(!every)return;this.checker[type]={};this.events[type].each(function(event){event.call(this,this.instances,instance);},this);}});var Accordion=Fx.Elements.extend({options:{onActive:Class.empty,onBackground:Class.empty,display:0,show:false,height:true,width:false,opacity:true,fixedHeight:false,fixedWidth:false,wait:false,alwaysHide:false},initialize:function(){var options,togglers,elements,container;$each(arguments,function(argument,i){switch($type(argument)){case'object':options=argument;break;case'element':container=$(argument);break;default:var temp=$$(argument);if(!togglers)togglers=temp;else elements=temp;}});this.togglers=togglers||[];this.elements=elements||[];this.container=$(container);this.setOptions(options);this.previous=-1;if(this.options.alwaysHide)this.options.wait=true;if($chk(this.options.show)){this.options.display=false;this.previous=this.options.show;}
if(this.options.start){this.options.display=false;this.options.show=false;}
this.effects={};if(this.options.opacity)this.effects.opacity='fullOpacity';if(this.options.width)this.effects.width=this.options.fixedWidth?'fullWidth':'offsetWidth';if(this.options.height)this.effects.height=this.options.fixedHeight?'fullHeight':'scrollHeight';for(var i=0,l=this.togglers.length;i<l;i++)this.addSection(this.togglers[i],this.elements[i]);this.elements.each(function(el,i){if(this.options.show===i){this.fireEvent('onActive',[this.togglers[i],el]);}else{for(var fx in this.effects)el.setStyle(fx,0);}},this);this.parent(this.elements);if($chk(this.options.display))this.display(this.options.display);},addSection:function(toggler,element,pos){toggler=$(toggler);element=$(element);var test=this.togglers.contains(toggler);var len=this.togglers.length;this.togglers.include(toggler);this.elements.include(element);if(len&&(!test||pos)){pos=$pick(pos,len-1);toggler.injectBefore(this.togglers[pos]);element.injectAfter(toggler);}else if(this.container&&!test){toggler.inject(this.container);element.inject(this.container);}
var idx=this.togglers.indexOf(toggler);toggler.addEvent('click',this.display.bind(this,idx));if(this.options.height)element.setStyles({'padding-top':0,'border-top':'none','padding-bottom':0,'border-bottom':'none'});if(this.options.width)element.setStyles({'padding-left':0,'border-left':'none','padding-right':0,'border-right':'none'});element.fullOpacity=1;if(this.options.fixedWidth)element.fullWidth=this.options.fixedWidth;if(this.options.fixedHeight)element.fullHeight=this.options.fixedHeight;element.setStyle('overflow','hidden');if(!test){for(var fx in this.effects)element.setStyle(fx,0);}
return this;},display:function(index){index=($type(index)=='element')?this.elements.indexOf(index):index;if((this.timer&&this.options.wait)||(index===this.previous&&!this.options.alwaysHide))return this;this.previous=index;var obj={};this.elements.each(function(el,i){obj[i]={};var hide=(i!=index)||(this.options.alwaysHide&&(el.offsetHeight>0));this.fireEvent(hide?'onBackground':'onActive',[this.togglers[i],el]);for(var fx in this.effects)obj[i][fx]=hide?0:el[this.effects[fx]];},this);return this.start(obj);},showThisHideOpen:function(index){return this.display(index);}});Fx.Accordion=Accordion;/*
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */
(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});
/*
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();
 jQuery.noConflict();
/*
 * 	Easy Slider 1.7 - jQuery plugin
 *	written by Alen Grakalic	
 *	http://cssglobe.com/post/4004/easy-slider-15-the-easiest-jquery-plugin-for-sliding
 *
 *	Copyright (c) 2009 Alen Grakalic (http://cssglobe.com)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
 
/*
 *	markup example for $("#slider").easySlider();
 *	
 * 	<div id="slider">
 *		<ul>
 *			<li><img src="images/01.jpg" alt="" /></li>
 *			<li><img src="images/02.jpg" alt="" /></li>
 *			<li><img src="images/03.jpg" alt="" /></li>
 *			<li><img src="images/04.jpg" alt="" /></li>
 *			<li><img src="images/05.jpg" alt="" /></li>
 *		</ul>
 *	</div>
 *
 */

(function($) {

	$.fn.easySlider = function(options){
	  
		// default configuration properties
		var defaults = {			
			prevId: 		'prevBtn',
			prevText: 		'Previous',
			nextId: 		'nextBtn',	
			nextText: 		'Next',
			controlsShow:	true,
			controlsBefore:	'',
			controlsAfter:	'',	
			controlsFade:	true,
			firstId: 		'firstBtn',
			firstText: 		'First',
			firstShow:		false,
			lastId: 		'lastBtn',	
			lastText: 		'Last',
			lastShow:		false,				
			vertical:		false,
			speed: 			500,
			auto:			false,
			pause:			2000,
			continuous:		false, 
			numeric: 		false,
			numericId: 		'controls'
		}; 
		
		var options = $.extend(defaults, options);  
				
		this.each(function() {  
			var obj = $(this); 				
			var s = $("li", obj).length;
			var w = $("li", obj).width(); 
			var h = $("li", obj).height(); 
      
			var clickable = true;
			obj.width(w); 
			obj.height(h); 
			obj.css("overflow","hidden");
			var ts = s-1;
			var t = 0;
			$("ul", obj).css('width',s*w);			
			
			if(options.continuous){
				$("ul", obj).prepend($("ul li:last-child", obj).clone().css("margin-left","-"+ w +"px"));
				$("ul", obj).append($("ul li:nth-child(2)", obj).clone());
				$("ul", obj).css('width',(s+1)*w);
			};				
			
			if(!options.vertical) $("li", obj).css('float','left');
								
			if(options.controlsShow){
				var html = options.controlsBefore;				
				if(options.numeric){
					html += '<ol id="'+ options.numericId +'"></ol>';
				} else {
					if(options.firstShow) html += '<span id="'+ options.firstId +'"><a href=\"javascript:void(0);\">'+ options.firstText +'</a></span>';
					html += ' <span id="'+ options.prevId +'"><a href=\"javascript:void(0);\">'+ options.prevText +'</a></span>';
					html += ' <span id="'+ options.nextId +'"><a href=\"javascript:void(0);\">'+ options.nextText +'</a></span>';
					if(options.lastShow) html += ' <span id="'+ options.lastId +'"><a href=\"javascript:void(0);\">'+ options.lastText +'</a></span>';				
				};
				
				html += options.controlsAfter;						
				$(obj).after(html);										
			};
			
			if(options.numeric){									
				for(var i=0;i<s;i++){						
					$(document.createElement("li"))
						.attr('id',options.numericId + (i+1))
						.html('<a rel='+ i +' href=\"javascript:void(0);\">'+ (i+1) +'</a>')
						.appendTo($("#"+ options.numericId))
						.click(function(){							
							animate($("a",$(this)).attr('rel'),true);
						}); 												
				};							
			} else {
				$("a","#"+options.nextId).click(function(){		
					animate("next",true);
				});
				$("a","#"+options.prevId).click(function(){		
					animate("prev",true);				
				});	
				$("a","#"+options.firstId).click(function(){		
					animate("first",true);
				});				
				$("a","#"+options.lastId).click(function(){		
					animate("last",true);				
				});				
			};
			
			function setCurrent(i){
				i = parseInt(i)+1;
				$("li", "#" + options.numericId).removeClass("current");
				$("li#" + options.numericId + i).addClass("current");
			};
			
			function adjust(){
				if(t>ts) t=0;		
				if(t<0) t=ts;	
				if(!options.vertical) {
					$("ul",obj).css("margin-left",(t*w*-1));
				} else {
					$("ul",obj).css("margin-left",(t*h*-1));
				}
				clickable = true;
				if(options.numeric) setCurrent(t);
			};
			
			function animate(dir,clicked){
				if (clickable){
					clickable = false;
					var ot = t;				
					switch(dir){
						case "next":
							t = (ot>=ts) ? (options.continuous ? t+1 : ts) : t+1;						
							break; 
						case "prev":
							t = (t<=0) ? (options.continuous ? t-1 : 0) : t-1;
							break; 
						case "first":
							t = 0;
							break; 
						case "last":
							t = ts;
							break; 
						default:
							t = dir;
							break; 
					};	
					var diff = Math.abs(ot-t);
					var speed = diff*options.speed;						
					if(!options.vertical) {
						p = (t*w*-1);
						$("ul",obj).animate(
							{ marginLeft: p }, 
							{ queue:false, duration:speed, complete:adjust }
						);				
					} else {
						p = (t*h*-1);
						$("ul",obj).animate(
							{ marginTop: p }, 
							{ queue:false, duration:speed, complete:adjust }
						);					
					};
					
					if(!options.continuous && options.controlsFade){					
						if(t==ts){
							$("a","#"+options.nextId).hide();
							$("a","#"+options.lastId).hide();
						} else {
							$("a","#"+options.nextId).show();
							$("a","#"+options.lastId).show();					
						};
						if(t==0){
							$("a","#"+options.prevId).hide();
							$("a","#"+options.firstId).hide();
						} else {
							$("a","#"+options.prevId).show();
							$("a","#"+options.firstId).show();
						};					
					};				
					
					if(clicked) clearTimeout(timeout);
					if(options.auto && dir=="next" && !clicked){;
						timeout = setTimeout(function(){
							animate("next",false);
						},diff*options.speed+options.pause);
					};
			
				};
				
			};
			// init
			var timeout;
			if(options.auto){;
				timeout = setTimeout(function(){
					animate("next",false);
				},options.pause);
			};		
			
			if(options.numeric) setCurrent(0);
		
			if(!options.continuous && options.controlsFade){					
				$("a","#"+options.prevId).hide();
				$("a","#"+options.firstId).hide();				
			};				
			
		});
	  
	};

})(jQuery);



/**
* @version		$Id: caption.js 5263 2006-10-02 01:25:24Z webImagery $
* @copyright	Copyright (C) 2005 - 2009 Open Source Matters. All rights reserved.
* @license		GNU/GPL, see LICENSE.php
* Joomla! is free software. This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
* See COPYRIGHT.php for copyright notices and details.
*/

/**
* JCaption javascript behavior
*
* Used for displaying image captions
*
* @package	Joomla
* @since	1.5
* @version	1.0
*/
var JCaption = new Class({
	initialize: function(selector)
	{
		this.selector = selector;

		var images = $$(selector);
		images.each(function(image){ this.createCaption(image); }, this);
	},

	createCaption: function(element)
	{
		var caption   = document.createTextNode(element.title);
		var container = document.createElement("div");
		var text      = document.createElement("p");
		var width     = element.getAttribute("width");
		var align     = element.getAttribute("align");
		var docMode = document.documentMode;

		//Windows fix
		if (!align)
			align = element.getStyle("float");  // Rest of the world fix
		if (!align) // IE DOM Fix
			align = element.style.styleFloat;

		text.appendChild(caption);
		text.className = this.selector.replace('.', '_');

		if (align=="none") {
			if (element.title != "") {
				element.parentNode.replaceChild(text, element);
				text.parentNode.insertBefore(element, text);
			}
		} else {
			element.parentNode.insertBefore(container, element);
			container.appendChild(element);
			if ( element.title != "" ) {
				container.appendChild(text);
			}
			container.className   = this.selector.replace('.', '_');
			container.className   = container.className + " " + align;
			container.setAttribute("style","float:"+align);

			//IE8 fix
			if (!docMode|| docMode < 8) {
				container.style.width = width + "px";
			}
		}

	}
});

document.caption = null;
window.addEvent('load', function() {
	var caption = new JCaption('img.caption')
	document.caption = caption
});
/**
* @version		$Id: validate.js 7401 2007-05-14 04:12:55Z eddieajau $
* @package		Joomla
* @copyright	Copyright (C) 2005 - 2008 Open Source Matters. All rights reserved.
* @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL, see LICENSE.php
* Joomla! is free software. This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
* See COPYRIGHT.php for copyright notices and details.
*/

/**
 * Unobtrusive Form Validation library
 *
 * Inspired by: Chris Campbell <www.particletree.com>
 *
 * @package		Joomla.Framework
 * @subpackage  Forms
 * @since    1.5
 */
var JFormValidator = new Class({
  initialize: function()
  {
    // Initialize variables
    this.handlers  = Object();
    this.custom    = Object();
    this.errorMessages = Object();

    // Default handlers
    this.setHandler('username',
      function (value) {
        regex = new RegExp("[\<|\>|\"|\'|\%|\;|\(|\)|\&]", "i");
        return !regex.test(value);
      }
    );

    this.setHandler('password',
      function (value) {
        regex=/^\S[\S ]{2,98}\S$/;
        return regex.test(value);
      }
    );

    this.setHandler('numeric',
      function (value) {
        regex=/^(\d|-)?(\d|,)*\.?\d*$/;
        return regex.test(value);
      }
    );

    this.setHandler('email',
      function (value) {
        regex=/^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
        return regex.test(value);
      }
    );

    // Attach to forms with class 'form-validate'
    var forms = $$('form.form-validate');
    forms.each(function(form){ this.attachToForm(form); }, this);
  },

  setHandler: function(name, fn, en)
  {
    en = (en == '') ? true : en;
    this.handlers[name] = { enabled: en, exec: fn };
  },

  attachToForm: function(form)
  {
    // Iterate through the form object and attach the validate method to all input fields.
    $A(form.elements).each(function(el){
      el = $(el);
      if ((el.getTag() == 'input' || el.getTag() == 'button') && el.getProperty('type') == 'submit') {
        if (el.hasClass('validate')) {
          el.onclick = function(){return document.formvalidator.isValid(this.form);};
        }
      } else {
        el.addEvent('blur', function(){return document.formvalidator.validate(this);});
      }
    });
  },

  validate: function(el)
  {
    // If the field is required make sure it has a value
    if ($(el).hasClass('required')) {
      if (!($(el).getValue())) {
        this.handleResponse(false, el, 'required');
        return false;
      }
    }

    // Only validate the field if the validate class is set
    var handler = (el.className && el.className.search(/validate-([a-zA-Z0-9\_\-]+)/) != -1) ? el.className.match(/validate-([a-zA-Z0-9\_\-]+)/)[1] : "";
    if (handler == '') {
      this.handleResponse(true, el);
      return true;
    }

    // Check the additional validation types
    if ((handler) && (handler != 'none') && (this.handlers[handler]) && $(el).getValue()) {
      // Execute the validation handler and return result
      if (this.handlers[handler].exec($(el).getValue()) != true) {
        this.handleResponse(false, el, handler);
        return false;
      }
    }

    // Return validation state
    this.handleResponse(true, el);
    return true;
  },

  isValid: function(form)
  {
    var valid = true;

    // Validate form fields
    for (var i=0;i < form.elements.length; i++) {
      this.hideErrorMessage(form.elements[i]);
      if (this.validate(form.elements[i]) == false) {
        valid = false;
      }
    }

    // Run custom form validators if present
    $A(this.custom).each(function(validator){
      if (validator.exec() != true) {
        valid = false;
      }
    });

    return valid;
  },

  handleResponse: function(state, el, handler)
  {
    // Find the label object for the given field if it exists
    if (!(el.labelref)) {
      var labels = $$('label');
      labels.each(function(label){
        if (label.getProperty('for') == el.getProperty('id')) {
          el.labelref = label;
        }
      });
    }

    // Set the element and its label (if exists) invalid state
    if (state == false) {
      el.addClass('invalid');
      if (el.labelref) {
        $(el.labelref).addClass('invalid');
      }

      if( el.form && el.form.id && handler )
      {
        var message = this.getErrorMessage(el.form.id, el, handler);

        if( message )
          this.showErrorMessage(el, message);
      }
    } else {
      el.removeClass('invalid');
      if (el.labelref) {
        $(el.labelref).removeClass('invalid');
      }
    }
  },

  showErrorMessage: function(el, message )
  {
    if( $(el.id + '-error') )
      return null;

    var div = document.createElement('div');
        div.setAttribute('id', el.id + '-error');
        div.innerHTML = '<div class="invalid">' + message + '</div>';

    this.insertAfter(el, div);
  },

  insertAfter: function ( referenceNode, newNode )
  {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  },

  hideErrorMessage: function(el)
  {
    this.remove(el.id + '-error');
  },

  remove: function (elId)
  {
    var oNodeToRemove = $(elId);

    if( oNodeToRemove )
      oNodeToRemove.parentNode.removeChild(oNodeToRemove);
  },

  setErrorMessages: function( formId, errorMessages )
  {
    this.errorMessages[ formId ] = new Object();
    this.errorMessages[ formId ] = errorMessages;
  },

  getErrorMessage: function( formId, el, handler )
  {
    if( typeof( this.errorMessages[formId] )  != "undefined" &&
        typeof( this.errorMessages[formId][el.getProperty('id')] ) != "undefined" &&
        typeof( this.errorMessages[formId][el.getProperty('id')][handler] ) != "undefined" )
    {
      return this.errorMessages[formId][el.getProperty('id')][handler];
    }
    else
    {
      return null;
    }
  }
});

document.formvalidator = null;
Window.onDomReady(function(){
  document.formvalidator = new JFormValidator();
});var methodType = 'get';
var rssFile = '/modules/mod_blog/rss.php';

var ajax1 = 'Microsoft.XmlHttp';
var ajax2 = 'MSXML2.XmlHttp';
var ajax3 = 'MSXML2.XmlHttp.3.0';
var ajax4 = 'MSXML2.XmlHttp.4.0';
var ajax5 = 'MSXML2.XmlHttp.5.0';

var errorMessage = 'XMLHttp (AJAX) not supported';

var points = '...';
var postNode = 'item';
var postTitleNode = 'title';
var postDescriptionNode = 'description';
var postLinkNode = 'link';
var postDateNode = 'pubDate';

var postElementId = 'post';
var postDateElementId = 'postDate';
var postLinkElementId = 'postLink';
var postDescriptionElementId = 'postShort';
var loaderId = 'loader';

var linkAttribute = 'href';
var loaderVisibilityStyle = 'none';
var postVisibilityStyle = 'block';
var undefinedValue = 'undefined';

var prefix = 'http://';

var month_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

var titleLength = 42;
var dateLength = 17;
var descriptionLength = 90;

function createXMLHttp() {
    if (window.ActiveXObject) {
        var ajaxVertions = [ajax1, ajax2, ajax3, ajax4, ajax5];
        for (var i = ajaxVertions.length - 1; i >= 0; i--) {
            try {
                var httpObj = new ActiveXObject(ajaxVertions[i]);
                return httpObj;
            } catch (e) { }
        }
    }else if(typeof XMLHttpRequest != undefinedValue)
        return new XMLHttpRequest();

    throw new Error(errorMessage);
}
function loadPost() {
    try {
    	if(!$(postDescriptionElementId))
    		return;
    	
        var rssUrl = getRssUrl();
        getPost(rssUrl);
    } catch (ex) { }
}
function getRssUrl() {
    return rssFile;
}
function getPost(rssUrl) {
 new Ajax(rssUrl, {method: 'get', onComplete: showResponse1}).request();
}
function showResponse1(response, responseDocument)
{
  if( !responseDocument )
    return;
  
	var docElem = responseDocument.documentElement;
    if (!docElem) return false;
	var blogElem = getNodes(docElem)[0];
    fillPost(blogElem.getElementsByTagName(postNode)[0]);
    displayPost();
}

function getNodes(obj) {
	var arr = new Array();
    if (!obj) return arr;
    if (!obj.childNodes) return arr;
	if (obj.childNodes.length < 1) return arr;
	for (var i = 0; i < obj.childNodes.length; i++) {
		if (obj.childNodes[i].nodeType != 3)
			arr.push(obj.childNodes[i]);
	}
	return arr;
}
function fillPost(post) {
	fillDescription(post);
	fillDate(post);
	fillLink(post);
}
function fillDescription(post){
    $(postDescriptionElementId).innerHTML = getDescription(post);
}
function fillDate(post){
	$(postDateElementId).innerHTML = getDate(post);
}
function fillLink(post){
	$(postLinkElementId).innerHTML = getTitle(post);
	$(postLinkElementId).setAttribute(linkAttribute, getLink(post));
}
function getLink(post){
    	return getNodeValue(post, postLinkNode);
}
function getTitle(post) {
    var title = getNodeValue(post, postTitleNode);
    return (title.length < titleLength) ? title : title.substring(0, titleLength - 1) + points;
}
function getDescription(post) {
        var description = getNodeValue(post, postDescriptionNode);
        var result = null;
        if(description.length < descriptionLength) {
            result = description;
        } else {
            result = description.substring(0, descriptionLength - 1);
            result = result.substring(0, result.lastIndexOf(' ') + 1) + points;
        }
        return result;
}
function getDate(post) {
    var xmlDate = getNodeValue(post, postDateNode);
    var time = Date.parse(xmlDate);

    var date = new Date();
    date.setTime(time);

    var post_date = date.getDate();
    var post_month = date.getMonth();
    var post_year = date.getFullYear();

    return month_names[post_month] + ', ' + post_date + ' ' + post_year;
}
function getNodeValue(post,tagName) {
    var valueNode = post.getElementsByTagName(tagName)[0];
	var value = valueNode.childNodes[0].data;
	return HtmlDecode(value);
}
function displayPost() {
    $(postElementId).style.display = postVisibilityStyle;
    $(loaderId).style.display = loaderVisibilityStyle;
}

function HtmlDecode(s) {
    var out = "";
    if (s == null) return;
    var l = s.length;
    for (var i = 0; i < l; i++) {
        var ch = s.charAt(i);
        if (ch == '&') {
            var semicolonIndex = s.indexOf(';', i + 1);
            if (semicolonIndex > 0) {
                var entity = s.substring(i + 1, semicolonIndex);
                if (entity.length > 1 && entity.charAt(0) == '#') {
                    if (entity.charAt(1) == 'x' || entity.charAt(1) == 'X')
                        ch = String.fromCharCode(eval('0' + entity.substring(1)));
                    else
                        ch = String.fromCharCode(eval(entity.substring(1)));
                }
                else {
                    switch (entity) {
                        case 'quot': ch = String.fromCharCode(0x0022); break;
                        case 'amp': ch = String.fromCharCode(0x0026); break;
                        case 'lt': ch = String.fromCharCode(0x003c); break;
                        case 'gt': ch = String.fromCharCode(0x003e); break;
                        case 'nbsp': ch = String.fromCharCode(0x00a0); break;
                        case 'iexcl': ch = String.fromCharCode(0x00a1); break;
                        case 'cent': ch = String.fromCharCode(0x00a2); break;
                        case 'pound': ch = String.fromCharCode(0x00a3); break;
                        case 'curren': ch = String.fromCharCode(0x00a4); break;
                        case 'yen': ch = String.fromCharCode(0x00a5); break;
                        case 'brvbar': ch = String.fromCharCode(0x00a6); break;
                        case 'sect': ch = String.fromCharCode(0x00a7); break;
                        case 'uml': ch = String.fromCharCode(0x00a8); break;
                        case 'copy': ch = String.fromCharCode(0x00a9); break;
                        case 'ordf': ch = String.fromCharCode(0x00aa); break;
                        case 'laquo': ch = String.fromCharCode(0x00ab); break;
                        case 'not': ch = String.fromCharCode(0x00ac); break;
                        case 'shy': ch = String.fromCharCode(0x00ad); break;
                        case 'reg': ch = String.fromCharCode(0x00ae); break;
                        case 'macr': ch = String.fromCharCode(0x00af); break;
                        case 'deg': ch = String.fromCharCode(0x00b0); break;
                        case 'plusmn': ch = String.fromCharCode(0x00b1); break;
                        case 'sup2': ch = String.fromCharCode(0x00b2); break;
                        case 'sup3': ch = String.fromCharCode(0x00b3); break;
                        case 'acute': ch = String.fromCharCode(0x00b4); break;
                        case 'micro': ch = String.fromCharCode(0x00b5); break;
                        case 'para': ch = String.fromCharCode(0x00b6); break;
                        case 'middot': ch = String.fromCharCode(0x00b7); break;
                        case 'cedil': ch = String.fromCharCode(0x00b8); break;
                        case 'sup1': ch = String.fromCharCode(0x00b9); break;
                        case 'ordm': ch = String.fromCharCode(0x00ba); break;
                        case 'raquo': ch = String.fromCharCode(0x00bb); break;
                        case 'frac14': ch = String.fromCharCode(0x00bc); break;
                        case 'frac12': ch = String.fromCharCode(0x00bd); break;
                        case 'frac34': ch = String.fromCharCode(0x00be); break;
                        case 'iquest': ch = String.fromCharCode(0x00bf); break;
                        case 'Agrave': ch = String.fromCharCode(0x00c0); break;
                        case 'Aacute': ch = String.fromCharCode(0x00c1); break;
                        case 'Acirc': ch = String.fromCharCode(0x00c2); break;
                        case 'Atilde': ch = String.fromCharCode(0x00c3); break;
                        case 'Auml': ch = String.fromCharCode(0x00c4); break;
                        case 'Aring': ch = String.fromCharCode(0x00c5); break;
                        case 'AElig': ch = String.fromCharCode(0x00c6); break;
                        case 'Ccedil': ch = String.fromCharCode(0x00c7); break;
                        case 'Egrave': ch = String.fromCharCode(0x00c8); break;
                        case 'Eacute': ch = String.fromCharCode(0x00c9); break;
                        case 'Ecirc': ch = String.fromCharCode(0x00ca); break;
                        case 'Euml': ch = String.fromCharCode(0x00cb); break;
                        case 'Igrave': ch = String.fromCharCode(0x00cc); break;
                        case 'Iacute': ch = String.fromCharCode(0x00cd); break;
                        case 'Icirc': ch = String.fromCharCode(0x00ce); break;
                        case 'Iuml': ch = String.fromCharCode(0x00cf); break;
                        case 'ETH': ch = String.fromCharCode(0x00d0); break;
                        case 'Ntilde': ch = String.fromCharCode(0x00d1); break;
                        case 'Ograve': ch = String.fromCharCode(0x00d2); break;
                        case 'Oacute': ch = String.fromCharCode(0x00d3); break;
                        case 'Ocirc': ch = String.fromCharCode(0x00d4); break;
                        case 'Otilde': ch = String.fromCharCode(0x00d5); break;
                        case 'Ouml': ch = String.fromCharCode(0x00d6); break;
                        case 'times': ch = String.fromCharCode(0x00d7); break;
                        case 'Oslash': ch = String.fromCharCode(0x00d8); break;
                        case 'Ugrave': ch = String.fromCharCode(0x00d9); break;
                        case 'Uacute': ch = String.fromCharCode(0x00da); break;
                        case 'Ucirc': ch = String.fromCharCode(0x00db); break;
                        case 'Uuml': ch = String.fromCharCode(0x00dc); break;
                        case 'Yacute': ch = String.fromCharCode(0x00dd); break;
                        case 'THORN': ch = String.fromCharCode(0x00de); break;
                        case 'szlig': ch = String.fromCharCode(0x00df); break;
                        case 'agrave': ch = String.fromCharCode(0x00e0); break;
                        case 'aacute': ch = String.fromCharCode(0x00e1); break;
                        case 'acirc': ch = String.fromCharCode(0x00e2); break;
                        case 'atilde': ch = String.fromCharCode(0x00e3); break;
                        case 'auml': ch = String.fromCharCode(0x00e4); break;
                        case 'aring': ch = String.fromCharCode(0x00e5); break;
                        case 'aelig': ch = String.fromCharCode(0x00e6); break;
                        case 'ccedil': ch = String.fromCharCode(0x00e7); break;
                        case 'egrave': ch = String.fromCharCode(0x00e8); break;
                        case 'eacute': ch = String.fromCharCode(0x00e9); break;
                        case 'ecirc': ch = String.fromCharCode(0x00ea); break;
                        case 'euml': ch = String.fromCharCode(0x00eb); break;
                        case 'igrave': ch = String.fromCharCode(0x00ec); break;
                        case 'iacute': ch = String.fromCharCode(0x00ed); break;
                        case 'icirc': ch = String.fromCharCode(0x00ee); break;
                        case 'iuml': ch = String.fromCharCode(0x00ef); break;
                        case 'eth': ch = String.fromCharCode(0x00f0); break;
                        case 'ntilde': ch = String.fromCharCode(0x00f1); break;
                        case 'ograve': ch = String.fromCharCode(0x00f2); break;
                        case 'oacute': ch = String.fromCharCode(0x00f3); break;
                        case 'ocirc': ch = String.fromCharCode(0x00f4); break;
                        case 'otilde': ch = String.fromCharCode(0x00f5); break;
                        case 'ouml': ch = String.fromCharCode(0x00f6); break;
                        case 'divide': ch = String.fromCharCode(0x00f7); break;
                        case 'oslash': ch = String.fromCharCode(0x00f8); break;
                        case 'ugrave': ch = String.fromCharCode(0x00f9); break;
                        case 'uacute': ch = String.fromCharCode(0x00fa); break;
                        case 'ucirc': ch = String.fromCharCode(0x00fb); break;
                        case 'uuml': ch = String.fromCharCode(0x00fc); break;
                        case 'yacute': ch = String.fromCharCode(0x00fd); break;
                        case 'thorn': ch = String.fromCharCode(0x00fe); break;
                        case 'yuml': ch = String.fromCharCode(0x00ff); break;
                        case 'OElig': ch = String.fromCharCode(0x0152); break;
                        case 'oelig': ch = String.fromCharCode(0x0153); break;
                        case 'Scaron': ch = String.fromCharCode(0x0160); break;
                        case 'scaron': ch = String.fromCharCode(0x0161); break;
                        case 'Yuml': ch = String.fromCharCode(0x0178); break;
                        case 'fnof': ch = String.fromCharCode(0x0192); break;
                        case 'circ': ch = String.fromCharCode(0x02c6); break;
                        case 'tilde': ch = String.fromCharCode(0x02dc); break;
                        case 'Alpha': ch = String.fromCharCode(0x0391); break;
                        case 'Beta': ch = String.fromCharCode(0x0392); break;
                        case 'Gamma': ch = String.fromCharCode(0x0393); break;
                        case 'Delta': ch = String.fromCharCode(0x0394); break;
                        case 'Epsilon': ch = String.fromCharCode(0x0395); break;
                        case 'Zeta': ch = String.fromCharCode(0x0396); break;
                        case 'Eta': ch = String.fromCharCode(0x0397); break;
                        case 'Theta': ch = String.fromCharCode(0x0398); break;
                        case 'Iota': ch = String.fromCharCode(0x0399); break;
                        case 'Kappa': ch = String.fromCharCode(0x039a); break;
                        case 'Lambda': ch = String.fromCharCode(0x039b); break;
                        case 'Mu': ch = String.fromCharCode(0x039c); break;
                        case 'Nu': ch = String.fromCharCode(0x039d); break;
                        case 'Xi': ch = String.fromCharCode(0x039e); break;
                        case 'Omicron': ch = String.fromCharCode(0x039f); break;
                        case 'Pi': ch = String.fromCharCode(0x03a0); break;
                        case ' Rho ': ch = String.fromCharCode(0x03a1); break;
                        case 'Sigma': ch = String.fromCharCode(0x03a3); break;
                        case 'Tau': ch = String.fromCharCode(0x03a4); break;
                        case 'Upsilon': ch = String.fromCharCode(0x03a5); break;
                        case 'Phi': ch = String.fromCharCode(0x03a6); break;
                        case 'Chi': ch = String.fromCharCode(0x03a7); break;
                        case 'Psi': ch = String.fromCharCode(0x03a8); break;
                        case 'Omega': ch = String.fromCharCode(0x03a9); break;
                        case 'alpha': ch = String.fromCharCode(0x03b1); break;
                        case 'beta': ch = String.fromCharCode(0x03b2); break;
                        case 'gamma': ch = String.fromCharCode(0x03b3); break;
                        case 'delta': ch = String.fromCharCode(0x03b4); break;
                        case 'epsilon': ch = String.fromCharCode(0x03b5); break;
                        case 'zeta': ch = String.fromCharCode(0x03b6); break;
                        case 'eta': ch = String.fromCharCode(0x03b7); break;
                        case 'theta': ch = String.fromCharCode(0x03b8); break;
                        case 'iota': ch = String.fromCharCode(0x03b9); break;
                        case 'kappa': ch = String.fromCharCode(0x03ba); break;
                        case 'lambda': ch = String.fromCharCode(0x03bb); break;
                        case 'mu': ch = String.fromCharCode(0x03bc); break;
                        case 'nu': ch = String.fromCharCode(0x03bd); break;
                        case 'xi': ch = String.fromCharCode(0x03be); break;
                        case 'omicron': ch = String.fromCharCode(0x03bf); break;
                        case 'pi': ch = String.fromCharCode(0x03c0); break;
                        case 'rho': ch = String.fromCharCode(0x03c1); break;
                        case 'sigmaf': ch = String.fromCharCode(0x03c2); break;
                        case 'sigma': ch = String.fromCharCode(0x03c3); break;
                        case 'tau': ch = String.fromCharCode(0x03c4); break;
                        case 'upsilon': ch = String.fromCharCode(0x03c5); break;
                        case 'phi': ch = String.fromCharCode(0x03c6); break;
                        case 'chi': ch = String.fromCharCode(0x03c7); break;
                        case 'psi': ch = String.fromCharCode(0x03c8); break;
                        case 'omega': ch = String.fromCharCode(0x03c9); break;
                        case 'thetasym': ch = String.fromCharCode(0x03d1); break;
                        case 'upsih': ch = String.fromCharCode(0x03d2); break;
                        case 'piv': ch = String.fromCharCode(0x03d6); break;
                        case 'ensp': ch = String.fromCharCode(0x2002); break;
                        case 'emsp': ch = String.fromCharCode(0x2003); break;
                        case 'thinsp': ch = String.fromCharCode(0x2009); break;
                        case 'zwnj': ch = String.fromCharCode(0x200c); break;
                        case 'zwj': ch = String.fromCharCode(0x200d); break;
                        case 'lrm': ch = String.fromCharCode(0x200e); break;
                        case 'rlm': ch = String.fromCharCode(0x200f); break;
                        case 'ndash': ch = String.fromCharCode(0x2013); break;
                        case 'mdash': ch = String.fromCharCode(0x2014); break;
                        case 'lsquo': ch = String.fromCharCode(0x2018); break;
                        case 'rsquo': ch = String.fromCharCode(0x2019); break;
                        case 'sbquo': ch = String.fromCharCode(0x201a); break;
                        case 'ldquo': ch = String.fromCharCode(0x201c); break;
                        case 'rdquo': ch = String.fromCharCode(0x201d); break;
                        case 'bdquo': ch = String.fromCharCode(0x201e); break;
                        case 'dagger': ch = String.fromCharCode(0x2020); break;
                        case 'Dagger': ch = String.fromCharCode(0x2021); break;
                        case 'bull': ch = String.fromCharCode(0x2022); break;
                        case 'hellip': ch = String.fromCharCode(0x2026); break;
                        case 'permil': ch = String.fromCharCode(0x2030); break;
                        case 'prime': ch = String.fromCharCode(0x2032); break;
                        case 'Prime': ch = String.fromCharCode(0x2033); break;
                        case 'lsaquo': ch = String.fromCharCode(0x2039); break;
                        case 'rsaquo': ch = String.fromCharCode(0x203a); break;
                        case 'oline': ch = String.fromCharCode(0x203e); break;
                        case 'frasl': ch = String.fromCharCode(0x2044); break;
                        case 'euro': ch = String.fromCharCode(0x20ac); break;
                        case 'image': ch = String.fromCharCode(0x2111); break;
                        case 'weierp': ch = String.fromCharCode(0x2118); break;
                        case 'real': ch = String.fromCharCode(0x211c); break;
                        case 'trade': ch = String.fromCharCode(0x2122); break;
                        case 'alefsym': ch = String.fromCharCode(0x2135); break;
                        case 'larr': ch = String.fromCharCode(0x2190); break;
                        case 'uarr': ch = String.fromCharCode(0x2191); break;
                        case 'rarr': ch = String.fromCharCode(0x2192); break;
                        case 'darr': ch = String.fromCharCode(0x2193); break;
                        case 'harr': ch = String.fromCharCode(0x2194); break;
                        case 'crarr': ch = String.fromCharCode(0x21b5); break;
                        case 'lArr': ch = String.fromCharCode(0x21d0); break;
                        case 'uArr': ch = String.fromCharCode(0x21d1); break;
                        case 'rArr': ch = String.fromCharCode(0x21d2); break;
                        case 'dArr': ch = String.fromCharCode(0x21d3); break;
                        case 'hArr': ch = String.fromCharCode(0x21d4); break;
                        case 'forall': ch = String.fromCharCode(0x2200); break;
                        case 'part': ch = String.fromCharCode(0x2202); break;
                        case 'exist': ch = String.fromCharCode(0x2203); break;
                        case 'empty': ch = String.fromCharCode(0x2205); break;
                        case 'nabla': ch = String.fromCharCode(0x2207); break;
                        case 'isin': ch = String.fromCharCode(0x2208); break;
                        case 'notin': ch = String.fromCharCode(0x2209); break;
                        case 'ni': ch = String.fromCharCode(0x220b); break;
                        case 'prod': ch = String.fromCharCode(0x220f); break;
                        case 'sum': ch = String.fromCharCode(0x2211); break;
                        case 'minus': ch = String.fromCharCode(0x2212); break;
                        case 'lowast': ch = String.fromCharCode(0x2217); break;
                        case 'radic': ch = String.fromCharCode(0x221a); break;
                        case 'prop': ch = String.fromCharCode(0x221d); break;
                        case 'infin': ch = String.fromCharCode(0x221e); break;
                        case 'ang': ch = String.fromCharCode(0x2220); break;
                        case 'and': ch = String.fromCharCode(0x2227); break;
                        case 'or': ch = String.fromCharCode(0x2228); break;
                        case 'cap': ch = String.fromCharCode(0x2229); break;
                        case 'cup': ch = String.fromCharCode(0x222a); break;
                        case 'int': ch = String.fromCharCode(0x222b); break;
                        case 'there4': ch = String.fromCharCode(0x2234); break;
                        case 'sim': ch = String.fromCharCode(0x223c); break;
                        case 'cong': ch = String.fromCharCode(0x2245); break;
                        case 'asymp': ch = String.fromCharCode(0x2248); break;
                        case 'ne': ch = String.fromCharCode(0x2260); break;
                        case 'equiv': ch = String.fromCharCode(0x2261); break;
                        case 'le': ch = String.fromCharCode(0x2264); break;
                        case 'ge': ch = String.fromCharCode(0x2265); break;
                        case 'sub': ch = String.fromCharCode(0x2282); break;
                        case 'sup': ch = String.fromCharCode(0x2283); break;
                        case 'nsub': ch = String.fromCharCode(0x2284); break;
                        case 'sube': ch = String.fromCharCode(0x2286); break;
                        case 'supe': ch = String.fromCharCode(0x2287); break;
                        case 'oplus': ch = String.fromCharCode(0x2295); break;
                        case 'otimes': ch = String.fromCharCode(0x2297); break;
                        case 'perp': ch = String.fromCharCode(0x22a5); break;
                        case 'sdot': ch = String.fromCharCode(0x22c5); break;
                        case 'lceil': ch = String.fromCharCode(0x2308); break;
                        case 'rceil': ch = String.fromCharCode(0x2309); break;
                        case 'lfloor': ch = String.fromCharCode(0x230a); break;
                        case 'rfloor': ch = String.fromCharCode(0x230b); break;
                        case 'lang': ch = String.fromCharCode(0x2329); break;
                        case 'rang': ch = String.fromCharCode(0x232a); break;
                        case 'loz': ch = String.fromCharCode(0x25ca); break;
                        case 'spades': ch = String.fromCharCode(0x2660); break;
                        case 'clubs': ch = String.fromCharCode(0x2663); break;
                        case 'hearts': ch = String.fromCharCode(0x2665); break;
                        case 'diams': ch = String.fromCharCode(0x2666); break;
                        default: ch = ''; break;
                    }
                }
                i = semicolonIndex;
            }
        }
        out += ch;
    }
    return out;
}

function getBlog()
{

}


function onsend(){
  var errors="";
  var contact_name = sym_Replace($("contact_name1").value);

  var email = $("email1").value;
  var emailreg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (email=="") errors = errors + "Please enter Your Email<br/>"
  else if (!(emailreg.test(email))) errors = errors + "Please enter a valid Email<br/>";

  var message = sym_Replace($("message1").value);
  if (message=="") errors = errors + "Please type Your Question<br/>"


  $("result").innerHTML = "Sending to server...";

  var url = '/index.php?option=com_contactus&task=send&sender=module';
  var pars = { contact_name: contact_name, email: email, message: message, subject: 'ask_us_a_question' };
  new Ajax(url, {method: 'post', onComplete: showResponse, data: pars}).request();
}

function showResponse(response){
  if (response==1){
    $("contact_name1").value = "";
    $("email1").value=""
    $("message1").value = "";
    $("result").innerHTML= "";    
    
   document.getElementById('contact_us_form_container').style.display = 'none'; 
   document.getElementById('contact_us_successful_message').style.display = 'block';       
  }
  else $("result").innerHTML = "Server error.";
}

function showHiddenContactUsForm()
{
   document.getElementById('contact_us_form_container').style.display = 'block'; 
   document.getElementById('contact_us_successful_message').style.display = 'none'; 
}

//replace symbols %, &, # in string
function sym_Replace(str)
{
	symbols = new Array();
	symbols[1] = { 'search' : '\%', 'replace' : '%25' }
	symbols[2] = { 'search' : '\&', 'replace' : '%26' }
	symbols[3] = { 'search' : '\#', 'replace' : '%23' }

	for (sym in symbols)
	{
		replace = symbols[sym]['replace'];
		str = str.replace(eval("/" + symbols[sym]['search'] + "/g"), replace);
		
	}
	
	str = str.replace(eval("/[\?]/g"), '%3F');
	str = str.replace(eval("/[\+]/g"), '%2B');
	
	return str;
}function sendToOxagile()
{
  parent.location='mailto:?subject=' + escape(document.title)+'&body=' + escape(window.location);  
}

PrivacyPolicyTooltip = {

  show: function(owner, position, corner){
    var html = document.getElementById('tooltip-hiding-' + corner).innerHTML;
    
    html = html.replace('<!--content-->', '<a href="http://oxagile.com/company/privacy-policy" target="_blank">View Privacy Policy</a>');

    Tip(html, FIX, [owner, position.x, position.y]);
  },
    
  hide: function(){
    window.setTimeout('UnTip();', 200);   
  }    
}//** Chrome Drop Down Menu- Author: Dynamic Drive (http://www.dynamicdrive.com)

//** Updated: July 14th 06' to v2.0
	//1) Ability to "left", "center", or "right" align the menu items easily, just by modifying the CSS property "text-align".
	//2) Added an optional "swipe down" transitional effect for revealing the drop down menus.
	//3) Support for multiple Chrome menus on the same page.

//** Updated: Nov 14th 06' to v2.01- added iframe shim technique

//** Updated: July 23rd, 08 to v2.4
	//1) Main menu items now remain "selected" (CSS class "selected" applied) when user moves mouse into corresponding drop down menu. 
	//2) Adds ability to specify arbitrary HTML that gets added to the end of each menu item that carries a drop down menu (ie: a down arrow image).
	//3) All event handlers added to the menu are now unobstrusive, allowing you to define your own "onmouseover" or "onclick" events on the menu items.
	//4) Fixed elusive JS error in FF that sometimes occurs when mouse quickly moves between main menu items and drop down menus

//** Updated: Oct 29th, 08 to v2.5 (only .js file modified from v2.4)
	//1) Added ability to customize reveal animation speed (# of steps)
	//2) Menu now works in IE8 beta2 (a valid doctype at the top of the page is required)

var cssdropdown={
disappeardelay: 500, //set delay in miliseconds before menu disappears onmouseout
dropdownindicator: '', //specify full HTML to add to end of each menu item with a drop down menu
enablereveal: [true, 5], //enable swipe effect? [true/false, steps (Number of animation steps. Integer between 1-20. Smaller=faster)]
enableiframeshim: 1, //enable "iframe shim" in IE5.5 to IE7? (1=yes, 0=no)

//No need to edit beyond here////////////////////////

dropmenuobj: null, asscmenuitem: null, domsupport: document.all || document.getElementById, standardbody: null, iframeshimadded: false, revealtimers: {},

getposOffset:function(what, offsettype){
	var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
	var parentEl=what.offsetParent;
	while (parentEl!=null){
		totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
		parentEl=parentEl.offsetParent;
	}
	return totaloffset;
},

css:function(el, targetclass, action){
	var needle=new RegExp("(^|\\s+)"+targetclass+"($|\\s+)", "ig")
	if (action=="check")
		return needle.test(el.className)
	else if (action=="remove")
		el.className=el.className.replace(needle, "")
	else if (action=="add" && !needle.test(el.className))
		el.className+=" "+targetclass
},

showmenu:function(dropmenu, e){
	if (this.enablereveal[0]){
		if (!dropmenu._trueheight || dropmenu._trueheight<10)
			dropmenu._trueheight=dropmenu.offsetHeight
		clearTimeout(this.revealtimers[dropmenu.id])
		dropmenu.style.height=dropmenu._curheight=0
		dropmenu.style.overflow="hidden"
		dropmenu.style.visibility="visible"
		this.revealtimers[dropmenu.id]=setInterval(function(){cssdropdown.revealmenu(dropmenu)}, 10)
	}
	else{
		dropmenu.style.visibility="visible"
	}
	this.css(this.asscmenuitem, "selected", "add")
},

revealmenu:function(dropmenu, dir){
	var curH=dropmenu._curheight, maxH=dropmenu._trueheight, steps=this.enablereveal[1]
	if (curH<maxH){
		var newH=Math.min(curH, maxH)
		dropmenu.style.height=newH+"px"
		dropmenu._curheight= newH + Math.round((maxH-newH)/steps) + 1
	}
	else{ //if done revealing menu
		dropmenu.style.height="auto"
		dropmenu.style.overflow="hidden"
		clearInterval(this.revealtimers[dropmenu.id])
	}
},

clearbrowseredge:function(obj, whichedge){
  var edgeoffset=0
  if (whichedge=="rightedge"){          
    var windowedge=this.standardbody.scrollLeft+this.standardbody.clientWidth-15;
    var dropmenuW=this.dropmenuobj.offsetWidth
    edgeoffset = this.dropmenuobj.x;
    if (this.dropmenuobj.x + dropmenuW > (this.standardbody.clientWidth - 1020) / 2 + 1020)  //move menu to the left?
      edgeoffset=(this.standardbody.clientWidth - 1020) / 2 + 1020 - dropmenuW;
  }
	else{
		var topedge=document.all && !window.opera? this.standardbody.scrollTop : window.pageYOffset
		var windowedge=document.all && !window.opera? this.standardbody.scrollTop+this.standardbody.clientHeight-15 : window.pageYOffset+window.innerHeight-18
		var dropmenuH=this.dropmenuobj._trueheight
		if (windowedge-this.dropmenuobj.y < dropmenuH){ //move up?
			edgeoffset=dropmenuH+obj.offsetHeight
			if ((this.dropmenuobj.y-topedge)<dropmenuH) //up no good either?
				edgeoffset=this.dropmenuobj.y+obj.offsetHeight-topedge
		}
	}
	return edgeoffset
},

dropit:function(obj, e, dropmenuID){
	if (this.dropmenuobj!=null) //hide previous menu
		this.hidemenu() //hide menu
	this.clearhidemenu()
	this.dropmenuobj=document.getElementById(dropmenuID) //reference drop down menu
	this.asscmenuitem=obj //reference associated menu item
	this.showmenu(this.dropmenuobj, e)
	this.dropmenuobj.x=this.getposOffset(obj, "left")
	this.dropmenuobj.y=this.getposOffset(obj, "top")
  
  var offsetRight = this.clearbrowseredge(obj, "rightedge");
  var offsetTop = obj.offsetHeight;  
  
  // NOTE: fast fix for OXS-552 
  if (navigator.userAgent.match(/Version\/3.*Safari\//))
  {  
    var offsetTop = 32;
    var offsetRight = offsetRight-1;
  }
    
	this.dropmenuobj.style.left=offsetRight+"px"
	this.dropmenuobj.style.top=this.dropmenuobj.y-this.clearbrowseredge(obj, "bottomedge")+offsetTop+1+"px"

	this.positionshim() //call iframe shim function
},

positionshim:function(){ //display iframe shim function
	if (this.iframeshimadded){
		if (this.dropmenuobj.style.visibility=="visible"){
			this.shimobject.style.width=this.dropmenuobj.offsetWidth+"px"
			this.shimobject.style.height=this.dropmenuobj._trueheight+"px"
			this.shimobject.style.left=parseInt(this.dropmenuobj.style.left)+"px"
			this.shimobject.style.top=parseInt(this.dropmenuobj.style.top)+"px"
			this.shimobject.style.display="block"
		}
	}
},

hideshim:function(){
	if (this.iframeshimadded)
		this.shimobject.style.display='none'
},

isContained:function(m, e){
	var e=window.event || e
	var c=e.relatedTarget || ((e.type=="mouseover")? e.fromElement : e.toElement)
	while (c && c!=m)try {c=c.parentNode} catch(e){c=m}
	if (c==m)
		return true
	else
		return false
},

dynamichide:function(m, e){
	if (!this.isContained(m, e)){
		this.delayhidemenu()
	}
},

delayhidemenu:function(){
	this.delayhide=setTimeout("cssdropdown.hidemenu()", this.disappeardelay) //hide menu
},

hidemenu:function(){
	this.css(this.asscmenuitem, "selected", "remove")
	this.dropmenuobj.style.visibility='hidden'
	this.dropmenuobj.style.left=this.dropmenuobj.style.top="-1000px"
	this.hideshim()
},

clearhidemenu:function(){
	if (this.delayhide!="undefined")
		clearTimeout(this.delayhide)
},

addEvent:function(target, functionref, tasktype){
	if (target.addEventListener)
		target.addEventListener(tasktype, functionref, false);
	else if (target.attachEvent)
		target.attachEvent('on'+tasktype, function(){return functionref.call(target, window.event)});
},

startchrome:function(){
	if (!this.domsupport)
		return
	this.standardbody=(document.compatMode=="CSS1Compat")? document.documentElement : document.body
	for (var ids=0; ids<arguments.length; ids++){
		var menuitems=document.getElementById(arguments[ids]).getElementsByTagName("a")
		for (var i=0; i<menuitems.length; i++){
			if (menuitems[i].getAttribute("rel")){
				var relvalue=menuitems[i].getAttribute("rel")
				var asscdropdownmenu=document.getElementById(relvalue)
				this.addEvent(asscdropdownmenu, function(){cssdropdown.clearhidemenu()}, "mouseover")
				this.addEvent(asscdropdownmenu, function(e){cssdropdown.dynamichide(this, e)}, "mouseout")
				this.addEvent(asscdropdownmenu, function(){cssdropdown.delayhidemenu()}, "click")
				try{
					menuitems[i].innerHTML=menuitems[i].innerHTML+" "+this.dropdownindicator
				}catch(e){}
				this.addEvent(menuitems[i], function(e){ //show drop down menu when main menu items are mouse over-ed
					if (!cssdropdown.isContained(this, e)){
						var evtobj=window.event || e
						cssdropdown.dropit(this, evtobj, this.getAttribute("rel"))
					}
				}, "mouseover")
				this.addEvent(menuitems[i], function(e){cssdropdown.dynamichide(this, e)}, "mouseout") //hide drop down menu when main menu items are mouse out
				this.addEvent(menuitems[i], function(){cssdropdown.delayhidemenu()}, "click") //hide drop down menu when main menu items are clicked on
			}
		} //end inner for
	} //end outer for
	if (this.enableiframeshim && document.all && !window.XDomainRequest && !this.iframeshimadded){ //enable iframe shim in IE5.5 thru IE7?
		document.write('<IFRAME id="iframeshim" src="about:blank" frameBorder="0" scrolling="no" style="left:0; top:0; position:absolute; display:none;z-index:90; background: transparent;"></IFRAME>')
		this.shimobject=document.getElementById("iframeshim") //reference iframe object
		this.shimobject.style.filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'
		this.iframeshimadded=true
	}
} //end startchrome

}