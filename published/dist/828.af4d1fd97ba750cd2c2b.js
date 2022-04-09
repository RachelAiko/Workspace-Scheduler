"use strict";(self.webpackChunkmy_first_project=self.webpackChunkmy_first_project||[]).push([[828],{4828:(ze,ee,m)=>{m.r(ee);var a=m(8239),k=m(3394),i=m(538),c=m(3854),te=(m(8026),m(5422),m(3910));function R(){return window}function S(){return(S=(0,a.Z)(function*(n,t,e){var r;const{BuildInfo:o}=R();(0,i.ap)(t.sessionId,"AuthEvent did not contain a session ID");const s=yield ue(t.sessionId),u={};return(0,i.aq)()?u.ibi=o.packageName:(0,i.ar)()?u.apn=o.packageName:(0,i.as)(n,"operation-not-supported-in-this-environment"),o.displayName&&(u.appDisplayName=o.displayName),u.sessionId=s,(0,i.at)(n,e,t.type,void 0,null!==(r=t.eventId)&&void 0!==r?r:void 0,u)})).apply(this,arguments)}function C(){return(C=(0,a.Z)(function*(n){const{BuildInfo:t}=R(),e={};(0,i.aq)()?e.iosBundleId=t.packageName:(0,i.ar)()?e.androidPackageName=t.packageName:(0,i.as)(n,"operation-not-supported-in-this-environment"),yield(0,i.au)(n,e)})).apply(this,arguments)}function b(){return(b=(0,a.Z)(function*(n,t,e){const{cordova:r}=R();let o=()=>{};try{yield new Promise((s,u)=>{let d=null;function h(){var l;s();const I=null===(l=r.plugins.browsertab)||void 0===l?void 0:l.close;"function"==typeof I&&I(),"function"==typeof(null==e?void 0:e.close)&&e.close()}function f(){d||(d=window.setTimeout(()=>{u((0,i.av)(n,"redirect-cancelled-by-user"))},2e3))}function v(){"visible"===(null==document?void 0:document.visibilityState)&&f()}t.addPassiveListener(h),document.addEventListener("resume",f,!1),(0,i.ar)()&&document.addEventListener("visibilitychange",v,!1),o=()=>{t.removePassiveListener(h),document.removeEventListener("resume",f,!1),document.removeEventListener("visibilitychange",v,!1),d&&window.clearTimeout(d)}})}finally{o()}})).apply(this,arguments)}function ue(n){return N.apply(this,arguments)}function N(){return(N=(0,a.Z)(function*(n){const t=le(n),e=yield crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(e)).map(o=>o.toString(16).padStart(2,"0")).join("")})).apply(this,arguments)}function le(n){if((0,i.ap)(/[0-9a-zA-Z]+/.test(n),"Can only convert alpha-numeric strings"),"undefined"!=typeof TextEncoder)return(new TextEncoder).encode(n);const t=new ArrayBuffer(n.length),e=new Uint8Array(t);for(let r=0;r<n.length;r++)e[r]=n.charCodeAt(r);return e}class ce extends i.az{constructor(){super(...arguments),this.passiveListeners=new Set,this.initPromise=new Promise(t=>{this.resolveInialized=t})}addPassiveListener(t){this.passiveListeners.add(t)}removePassiveListener(t){this.passiveListeners.delete(t)}resetRedirect(){this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1}onEvent(t){return this.resolveInialized(),this.passiveListeners.forEach(e=>e(t)),super.onEvent(t)}initialized(){var t=this;return(0,a.Z)(function*(){yield t.initPromise})()}}function B(n){return O.apply(this,arguments)}function O(){return(O=(0,a.Z)(function*(n){const t=yield L()._get(T(n));return t&&(yield L()._remove(T(n))),t})).apply(this,arguments)}function fe(){const n=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let e=0;e<20;e++){const r=Math.floor(Math.random()*t.length);n.push(t.charAt(r))}return n.join("")}function L(){return(0,i.ax)(i.b)}function T(n){return(0,i.ay)("authEvent",n.config.apiKey,n.name)}function A(n){if(!(null==n?void 0:n.includes("?")))return{};const[t,...e]=n.split("?");return(0,c.zd)(e.join("?"))}function z(){return{type:"unknown",eventId:null,sessionId:null,urlResponse:null,postBody:null,tenantId:null,error:(0,i.av)("no-auth-event")}}function w(){var n;return(null===(n=null==self?void 0:self.location)||void 0===n?void 0:n.protocol)||null}function G(n=(0,c.z$)()){return!("file:"!==w()&&"ionic:"!==w()||!n.toLowerCase().match(/iphone|ipad|ipod|android/))}function H(){try{const n=self.localStorage,t=i.aG();if(n)return n.setItem(t,"1"),n.removeItem(t),!function(n=(0,c.z$)()){return(0,c.w1)()&&11===(null==document?void 0:document.documentMode)||function(n=(0,c.z$)()){return/Edge\/\d+/.test(n)}(n)}()||(0,c.hl)()}catch(n){return U()&&(0,c.hl)()}return!1}function U(){return"undefined"!=typeof global&&"WorkerGlobalScope"in global&&"importScripts"in global}function x(){return("http:"===w()||"https:"===w()||(0,c.ru)()||G())&&!((0,c.b$)()||(0,c.UG)())&&H()&&!U()}function K(){return G()&&"undefined"!=typeof document}function M(){return(M=(0,a.Z)(function*(){return!!K()&&new Promise(n=>{const t=setTimeout(()=>{n(!1)},1e3);document.addEventListener("deviceready",()=>{clearTimeout(t),n(!0)})})})).apply(this,arguments)}const p={LOCAL:"local",NONE:"none",SESSION:"session"},E=i.aw,Y="persistence";function Z(n){return D.apply(this,arguments)}function D(){return(D=(0,a.Z)(function*(n){yield n._initializationPromise;const t=$(),e=i.ay(Y,n.config.apiKey,n.name);(null==t?void 0:t.sessionStorage)&&t.sessionStorage.setItem(e,n._getPersistence())})).apply(this,arguments)}function $(){return"undefined"!=typeof window?window:null}const Te=i.aw;class y{constructor(){this.browserResolver=i.ax(i.k),this.cordovaResolver=i.ax(class{constructor(){this._redirectPersistence=i.a,this._shouldInitProactively=!0,this.eventManagers=new Map,this.originValidationPromises={},this._completeRedirectFn=i.aA}_initialize(t){var e=this;return(0,a.Z)(function*(){const r=t._key();let o=e.eventManagers.get(r);return o||(o=new ce(t),e.eventManagers.set(r,o),e.attachCallbackListeners(t,o)),o})()}_openPopup(t){(0,i.as)(t,"operation-not-supported-in-this-environment")}_openRedirect(t,e,r,o){var s=this;return(0,a.Z)(function*(){!function(n){var t,e,r,o,s,u,d,h,f,v;const l=R();(0,i.aw)("function"==typeof(null===(t=null==l?void 0:l.universalLinks)||void 0===t?void 0:t.subscribe),n,"invalid-cordova-configuration",{missingPlugin:"cordova-universal-links-plugin-fix"}),(0,i.aw)(void 0!==(null===(e=null==l?void 0:l.BuildInfo)||void 0===e?void 0:e.packageName),n,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-buildInfo"}),(0,i.aw)("function"==typeof(null===(s=null===(o=null===(r=null==l?void 0:l.cordova)||void 0===r?void 0:r.plugins)||void 0===o?void 0:o.browsertab)||void 0===s?void 0:s.openUrl),n,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),(0,i.aw)("function"==typeof(null===(h=null===(d=null===(u=null==l?void 0:l.cordova)||void 0===u?void 0:u.plugins)||void 0===d?void 0:d.browsertab)||void 0===h?void 0:h.isAvailable),n,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),(0,i.aw)("function"==typeof(null===(v=null===(f=null==l?void 0:l.cordova)||void 0===f?void 0:f.InAppBrowser)||void 0===v?void 0:v.open),n,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-inappbrowser"})}(t);const u=yield s._initialize(t);yield u.initialized(),u.resetRedirect(),(0,i.aB)(),yield s._originValidation(t);const d=function(n,t,e=null){return{type:t,eventId:e,urlResponse:null,sessionId:fe(),postBody:null,tenantId:n.tenantId,error:(0,i.av)(n,"no-auth-event")}}(t,r,o);yield function(n,t){return L()._set(T(n),t)}(t,d);const h=yield function(n,t,e){return S.apply(this,arguments)}(t,d,e),f=yield function(n){const{cordova:t}=R();return new Promise(e=>{t.plugins.browsertab.isAvailable(r=>{let o=null;r?t.plugins.browsertab.openUrl(n):o=t.InAppBrowser.open(n,(0,i.ao)()?"_blank":"_system","location=yes"),e(o)})})}(h);return function(n,t,e){return b.apply(this,arguments)}(t,u,f)})()}_isIframeWebStorageSupported(t,e){throw new Error("Method not implemented.")}_originValidation(t){const e=t._key();return this.originValidationPromises[e]||(this.originValidationPromises[e]=function(n){return C.apply(this,arguments)}(t)),this.originValidationPromises[e]}attachCallbackListeners(t,e){const{universalLinks:r,handleOpenURL:o,BuildInfo:s}=R(),u=setTimeout((0,a.Z)(function*(){yield B(t),e.onEvent(z())}),500),d=function(){var v=(0,a.Z)(function*(l){clearTimeout(u);const I=yield B(t);let q=null;I&&(null==l?void 0:l.url)&&(q=function(n,t){var e,r;const o=function(n){const t=A(n),e=t.link?decodeURIComponent(t.link):void 0,r=A(e).link,o=t.deep_link_id?decodeURIComponent(t.deep_link_id):void 0;return A(o).link||o||r||e||n}(t);if(o.includes("/__/auth/callback")){const s=A(o),u=s.firebaseError?function(n){try{return JSON.parse(n)}catch(t){return null}}(decodeURIComponent(s.firebaseError)):null,d=null===(r=null===(e=null==u?void 0:u.code)||void 0===e?void 0:e.split("auth/"))||void 0===r?void 0:r[1],h=d?(0,i.av)(d):null;return h?{type:n.type,eventId:n.eventId,tenantId:n.tenantId,error:h,urlResponse:null,sessionId:null,postBody:null}:{type:n.type,eventId:n.eventId,tenantId:n.tenantId,sessionId:n.sessionId,urlResponse:o,postBody:null}}return null}(I,l.url)),e.onEvent(q||z())});return function(I){return v.apply(this,arguments)}}();void 0!==r&&"function"==typeof r.subscribe&&r.subscribe(null,d);const h=o,f=`${s.packageName.toLowerCase()}://`;R().handleOpenURL=function(){var v=(0,a.Z)(function*(l){if(l.toLowerCase().startsWith(f)&&d({url:l}),"function"==typeof h)try{h(l)}catch(I){console.error(I)}});return function(l){return v.apply(this,arguments)}}()}}),this.underlyingResolver=null,this._redirectPersistence=i.a,this._completeRedirectFn=i.aA}_initialize(t){var e=this;return(0,a.Z)(function*(){return yield e.selectUnderlyingResolver(),e.assertedUnderlyingResolver._initialize(t)})()}_openPopup(t,e,r,o){var s=this;return(0,a.Z)(function*(){return yield s.selectUnderlyingResolver(),s.assertedUnderlyingResolver._openPopup(t,e,r,o)})()}_openRedirect(t,e,r,o){var s=this;return(0,a.Z)(function*(){return yield s.selectUnderlyingResolver(),s.assertedUnderlyingResolver._openRedirect(t,e,r,o)})()}_isIframeWebStorageSupported(t,e){this.assertedUnderlyingResolver._isIframeWebStorageSupported(t,e)}_originValidation(t){return this.assertedUnderlyingResolver._originValidation(t)}get _shouldInitProactively(){return K()||this.browserResolver._shouldInitProactively}get assertedUnderlyingResolver(){return Te(this.underlyingResolver,"internal-error"),this.underlyingResolver}selectUnderlyingResolver(){var t=this;return(0,a.Z)(function*(){if(t.underlyingResolver)return;const e=yield function(){return M.apply(this,arguments)}();t.underlyingResolver=e?t.cordovaResolver:t.browserResolver})()}}function J(n){return n.unwrap()}function xe(n){return j(n)}function j(n){const{_tokenResponse:t}=n instanceof c.ZR?n.customData:n;if(!t)return null;if(!(n instanceof c.ZR)&&"temporaryProof"in t&&"phoneNumber"in t)return i.P.credentialFromResult(n);const e=t.providerId;if(!e||e===i.o.PASSWORD)return null;let r;switch(e){case i.o.GOOGLE:r=i.N;break;case i.o.FACEBOOK:r=i.M;break;case i.o.GITHUB:r=i.Q;break;case i.o.TWITTER:r=i.V;break;default:const{oauthIdToken:o,oauthAccessToken:s,oauthTokenSecret:u,pendingToken:d,nonce:h}=t;return s||u||o||d?d?e.startsWith("saml.")?i.aJ._create(e,d):i.I._fromParams({providerId:e,signInMethod:e,pendingToken:d,idToken:o,accessToken:s}):new i.T(e).credential({idToken:o,accessToken:s,rawNonce:h}):null}return n instanceof c.ZR?r.credentialFromError(n):r.credentialFromResult(n)}function g(n,t){return t.catch(e=>{throw e instanceof c.ZR&&function(n,t){var e;const r=null===(e=t.customData)||void 0===e?void 0:e._tokenResponse;if("auth/multi-factor-auth-required"===t.code)t.resolver=new Ze(n,i.am(n,t));else if(r){const o=j(t),s=t;o&&(s.credential=o,s.tenantId=r.tenantId||void 0,s.email=r.email||void 0,s.phoneNumber=r.phoneNumber||void 0)}}(n,e),e}).then(e=>{const o=e.user;return{operationType:e.operationType,credential:xe(e),additionalUserInfo:i.ak(e),user:_.getOrCreate(o)}})}function W(n,t){return F.apply(this,arguments)}function F(){return(F=(0,a.Z)(function*(n,t){const e=yield t;return{verificationId:e.verificationId,confirm:r=>g(n,e.confirm(r))}})).apply(this,arguments)}class Ze{constructor(t,e){this.resolver=e,this.auth=t.wrapped()}get session(){return this.resolver.session}get hints(){return this.resolver.hints}resolveSignIn(t){return g(J(this.auth),this.resolver.resolveSignIn(t))}}class _{constructor(t){this._delegate=t,this.multiFactor=i.an(t)}static getOrCreate(t){return _.USER_MAP.has(t)||_.USER_MAP.set(t,new _(t)),_.USER_MAP.get(t)}delete(){return this._delegate.delete()}reload(){return this._delegate.reload()}toJSON(){return this._delegate.toJSON()}getIdTokenResult(t){return this._delegate.getIdTokenResult(t)}getIdToken(t){return this._delegate.getIdToken(t)}linkAndRetrieveDataWithCredential(t){return this.linkWithCredential(t)}linkWithCredential(t){var e=this;return(0,a.Z)(function*(){return g(e.auth,i.Y(e._delegate,t))})()}linkWithPhoneNumber(t,e){var r=this;return(0,a.Z)(function*(){return W(r.auth,i.l(r._delegate,t,e))})()}linkWithPopup(t){var e=this;return(0,a.Z)(function*(){return g(e.auth,i.d(e._delegate,t,y))})()}linkWithRedirect(t){var e=this;return(0,a.Z)(function*(){return yield Z(i.aC(e.auth)),i.g(e._delegate,t,y)})()}reauthenticateAndRetrieveDataWithCredential(t){return this.reauthenticateWithCredential(t)}reauthenticateWithCredential(t){var e=this;return(0,a.Z)(function*(){return g(e.auth,i.Z(e._delegate,t))})()}reauthenticateWithPhoneNumber(t,e){return W(this.auth,i.r(this._delegate,t,e))}reauthenticateWithPopup(t){return g(this.auth,i.e(this._delegate,t,y))}reauthenticateWithRedirect(t){var e=this;return(0,a.Z)(function*(){return yield Z(i.aC(e.auth)),i.h(e._delegate,t,y)})()}sendEmailVerification(t){return i.aa(this._delegate,t)}unlink(t){var e=this;return(0,a.Z)(function*(){return yield i.aj(e._delegate,t),e})()}updateEmail(t){return i.af(this._delegate,t)}updatePassword(t){return i.ag(this._delegate,t)}updatePhoneNumber(t){return i.u(this._delegate,t)}updateProfile(t){return i.ae(this._delegate,t)}verifyBeforeUpdateEmail(t,e){return i.ab(this._delegate,t,e)}get emailVerified(){return this._delegate.emailVerified}get isAnonymous(){return this._delegate.isAnonymous}get metadata(){return this._delegate.metadata}get phoneNumber(){return this._delegate.phoneNumber}get providerData(){return this._delegate.providerData}get refreshToken(){return this._delegate.refreshToken}get tenantId(){return this._delegate.tenantId}get displayName(){return this._delegate.displayName}get email(){return this._delegate.email}get photoURL(){return this._delegate.photoURL}get providerId(){return this._delegate.providerId}get uid(){return this._delegate.uid}get auth(){return this._delegate.auth}}_.USER_MAP=new WeakMap;const P=i.aw;let Q=(()=>{class n{constructor(e,r){if(this.app=e,r.isInitialized())return this._delegate=r.getImmediate(),void this.linkUnderlyingAuth();const{apiKey:o}=e.options;P(o,"invalid-api-key",{appName:e.name}),P(o,"invalid-api-key",{appName:e.name});const s="undefined"!=typeof window?y:void 0;this._delegate=r.initialize({options:{persistence:De(o,e.name),popupRedirectResolver:s}}),this._delegate._updateErrorMap(i.z),this.linkUnderlyingAuth()}get emulatorConfig(){return this._delegate.emulatorConfig}get currentUser(){return this._delegate.currentUser?_.getOrCreate(this._delegate.currentUser):null}get languageCode(){return this._delegate.languageCode}set languageCode(e){this._delegate.languageCode=e}get settings(){return this._delegate.settings}get tenantId(){return this._delegate.tenantId}set tenantId(e){this._delegate.tenantId=e}useDeviceLanguage(){this._delegate.useDeviceLanguage()}signOut(){return this._delegate.signOut()}useEmulator(e,r){i.E(this._delegate,e,r)}applyActionCode(e){return i.a1(this._delegate,e)}checkActionCode(e){return i.a2(this._delegate,e)}confirmPasswordReset(e,r){return i.a0(this._delegate,e,r)}createUserWithEmailAndPassword(e,r){var o=this;return(0,a.Z)(function*(){return g(o._delegate,i.a4(o._delegate,e,r))})()}fetchProvidersForEmail(e){return this.fetchSignInMethodsForEmail(e)}fetchSignInMethodsForEmail(e){return i.a9(this._delegate,e)}isSignInWithEmailLink(e){return i.a7(this._delegate,e)}getRedirectResult(){var e=this;return(0,a.Z)(function*(){P(x(),e._delegate,"operation-not-supported-in-this-environment");const r=yield i.j(e._delegate,y);return r?g(e._delegate,Promise.resolve(r)):{credential:null,user:null}})()}addFrameworkForLogging(e){!function(n,t){(0,i.aC)(n)._logFramework(t)}(this._delegate,e)}onAuthStateChanged(e,r,o){const{next:s,error:u,complete:d}=X(e,r,o);return this._delegate.onAuthStateChanged(s,u,d)}onIdTokenChanged(e,r,o){const{next:s,error:u,complete:d}=X(e,r,o);return this._delegate.onIdTokenChanged(s,u,d)}sendSignInLinkToEmail(e,r){return i.a6(this._delegate,e,r)}sendPasswordResetEmail(e,r){return i.$(this._delegate,e,r||void 0)}setPersistence(e){var r=this;return(0,a.Z)(function*(){let o;switch(function(n,t){E(Object.values(p).includes(t),n,"invalid-persistence-type"),(0,c.b$)()?E(t!==p.SESSION,n,"unsupported-persistence-type"):(0,c.UG)()?E(t===p.NONE,n,"unsupported-persistence-type"):U()?E(t===p.NONE||t===p.LOCAL&&(0,c.hl)(),n,"unsupported-persistence-type"):E(t===p.NONE||H(),n,"unsupported-persistence-type")}(r._delegate,e),e){case p.SESSION:o=i.a;break;case p.LOCAL:o=(yield i.ax(i.i)._isAvailable())?i.i:i.b;break;case p.NONE:o=i.K;break;default:return i.as("argument-error",{appName:r._delegate.name})}return r._delegate.setPersistence(o)})()}signInAndRetrieveDataWithCredential(e){return this.signInWithCredential(e)}signInAnonymously(){return g(this._delegate,i.W(this._delegate))}signInWithCredential(e){return g(this._delegate,i.X(this._delegate,e))}signInWithCustomToken(e){return g(this._delegate,i._(this._delegate,e))}signInWithEmailAndPassword(e,r){return g(this._delegate,i.a5(this._delegate,e,r))}signInWithEmailLink(e,r){return g(this._delegate,i.a8(this._delegate,e,r))}signInWithPhoneNumber(e,r){return W(this._delegate,i.s(this._delegate,e,r))}signInWithPopup(e){var r=this;return(0,a.Z)(function*(){return P(x(),r._delegate,"operation-not-supported-in-this-environment"),g(r._delegate,i.c(r._delegate,e,y))})()}signInWithRedirect(e){var r=this;return(0,a.Z)(function*(){return P(x(),r._delegate,"operation-not-supported-in-this-environment"),yield Z(r._delegate),i.f(r._delegate,e,y)})()}updateCurrentUser(e){return this._delegate.updateCurrentUser(e)}verifyPasswordResetCode(e){return i.a3(this._delegate,e)}unwrap(){return this._delegate}_delete(){return this._delegate._delete()}linkUnderlyingAuth(){this._delegate.wrapped=()=>this}}return n.Persistence=p,n})();function X(n,t,e){let r=n;"function"!=typeof n&&({next:r,error:t,complete:e}=n);const o=r;return{next:u=>o(u&&_.getOrCreate(u)),error:t,complete:e}}function De(n,t){const e=function(n,t){const e=$();if(!(null==e?void 0:e.sessionStorage))return[];const r=i.ay(Y,n,t);switch(e.sessionStorage.getItem(r)){case p.NONE:return[i.K];case p.LOCAL:return[i.i,i.a];case p.SESSION:return[i.a];default:return[]}}(n,t);if("undefined"!=typeof self&&!e.includes(i.i)&&e.push(i.i),"undefined"!=typeof window)for(const r of[i.b,i.a])e.includes(r)||e.push(r);return e.includes(i.K)||e.push(i.K),e}class V{constructor(){this.providerId="phone",this._delegate=new i.P(J(k.Z.auth()))}static credential(t,e){return i.P.credential(t,e)}verifyPhoneNumber(t,e){return this._delegate.verifyPhoneNumber(t,e)}unwrap(){return this._delegate}}V.PHONE_SIGN_IN_METHOD=i.P.PHONE_SIGN_IN_METHOD,V.PROVIDER_ID=i.P.PROVIDER_ID;const We=i.aw;var n;(n=k.Z).INTERNAL.registerComponent(new te.wA("auth-compat",t=>{const e=t.getProvider("app-compat").getImmediate(),r=t.getProvider("auth");return new Q(e,r)},"PUBLIC").setServiceProps({ActionCodeInfo:{Operation:{EMAIL_SIGNIN:i.A.EMAIL_SIGNIN,PASSWORD_RESET:i.A.PASSWORD_RESET,RECOVER_EMAIL:i.A.RECOVER_EMAIL,REVERT_SECOND_FACTOR_ADDITION:i.A.REVERT_SECOND_FACTOR_ADDITION,VERIFY_AND_CHANGE_EMAIL:i.A.VERIFY_AND_CHANGE_EMAIL,VERIFY_EMAIL:i.A.VERIFY_EMAIL}},EmailAuthProvider:i.L,FacebookAuthProvider:i.M,GithubAuthProvider:i.Q,GoogleAuthProvider:i.N,OAuthProvider:i.T,SAMLAuthProvider:i.U,PhoneAuthProvider:V,PhoneMultiFactorGenerator:i.m,RecaptchaVerifier:class{constructor(t,e,r=k.Z.app()){var o;We(null===(o=r.options)||void 0===o?void 0:o.apiKey,"invalid-api-key",{appName:r.name}),this._delegate=new i.R(t,e,r.auth()),this.type=this._delegate.type}clear(){this._delegate.clear()}render(){return this._delegate.render()}verify(){return this._delegate.verify()}},TwitterAuthProvider:i.V,Auth:Q,AuthCredential:i.G,Error:c.ZR}).setInstantiationMode("LAZY").setMultipleInstances(!1)),n.registerVersion("@firebase/auth-compat","0.2.6")}}]);