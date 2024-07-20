AudioWorkletProcessor.prototype._43=function(){this._53=true;this.port.onmessage=(_63)=>{if(_63.data==="kill")this._53=false;};};class _73 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1}];}constructor(){super();this._43();}process(_83,_93,parameters){const input=_83[0];const bypass=parameters.bypass;for(let c=0;c<input.length;++c){const _a3=input[c];for(let _b3=0;_b3<_a3.length;++_b3){const _c3=(bypass[_b3]!==undefined)?bypass[_b3]:bypass[0];
    _93[_c3][c][_b3]=_a3[_b3];}}return this._53;}}class _d3 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"gain",automationRate:"a-rate",defaultValue:1,minValue:0}];}constructor(){super();this._43();}process(_83,_93,parameters){const _e3=_83[0];const _f3=_83[1];const output=_93[0];const gain=parameters.gain;for(let c=0;c<_f3.length;++c){const _a3=_f3[c];const _g3=output[c];for(let _b3=0;_b3<_a3.length;++_b3)_g3[_b3]=_a3[_b3];}for(let c=0;c<_e3.length;++c){const _a3=_e3[c];const _g3=output[c];
    for(let _b3=0;_b3<_a3.length;++_b3){const _h3=(gain[_b3]!==undefined)?gain[_b3]:gain[0];_g3[_b3]+=_a3[_b3]*_h3;}}return this._53;}}registerProcessor("audio-bus-input",_73);registerProcessor("audio-bus-output",_d3);class _i3 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"gain",automationRate:"a-rate",defaultValue:1.0,minValue:0.0},{name:"factor",automationRate:"a-rate",defaultValue:20,minValue:1,maxValue:100}
    ,{name:"resolution",automationRate:"a-rate",defaultValue:8,minValue:2,maxValue:16},{name:"mix",automationRate:"a-rate",defaultValue:0.8,minValue:0.0,maxValue:1.0}];}static _j3=[undefined,undefined,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768];constructor(_k3){super();this._43();const _l3=_k3.outputChannelCount[0];this._m3=new Float32Array(_l3);this._n3=new Uint32Array(_l3);}process(_83,_93,parameters){const input=_83[0];const output=_93[0];const bypass=parameters.bypass;const gain=parameters.gain;
    const factor=parameters.factor;const resolution=parameters.resolution;const mix=parameters.mix;for(let c=0;c<input.length;++c){const _a3=input[c];const _g3=output[c];for(let _b3=0;_b3<_a3.length;++_b3){_g3[_b3]=_a3[_b3];if(this._n3[c]===0)this._m3[c]=_a3[_b3];const _o3=(factor[_b3]!==undefined)?factor[_b3]:factor[0];++this._n3[c];this._n3[c]%=_o3;const _c3=(bypass[_b3]!==undefined)?bypass[_b3]:bypass[0];if(_c3>0.0){continue;}let _p3=this._m3[c];const _h3=(gain[_b3]!==undefined)?gain[_b3]:gain[0];_p3*=_h3;_p3=Math.max(Math.min(_p3,
    1.0),-1.0);const _q3=(resolution[_b3]!==undefined)?resolution[_b3]:resolution[0];const max=(_p3>0.0)?_i3._j3[_q3]-1:_i3._j3[_q3];_p3=Math.round(_p3*max)/max;const _r3=(mix[_b3]!==undefined)?mix[_b3]:mix[0];_g3[_b3]*=(1.0-_r3);_g3[_b3]+=(_p3*_r3);}}return this._53;}}registerProcessor("bitcrusher-processor",_i3);class _s3{constructor(_t3=1e-3){this.setTime(_t3);}setTime(_t3){this._u3=Math.exp(-1/(_t3*sampleRate));}process(_v3,_w3){return _v3+this._u3*(_w3-_v3);}}class _x3{constructor(_y3,_z3){this._A3=new _s3(_y3);
    this._B3=new _s3(_z3);this._C3=_y3;this._D3=_z3;}_E3(_t3){if(_t3===this._C3)return;this._A3.setTime(_t3);this._C3=_t3;}_F3(_t3){if(_t3===this._D3)return;this._B3.setTime(_t3);this._D3=_t3;}process(_v3,_w3){if(_v3>_w3)return this._A3.process(_v3,_w3);else return this._B3.process(_v3,_w3);}}class _G3 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"ingain",automationRate:"a-rate",defaultValue:1,minValue:0}
    ,{name:"threshold",automationRate:"a-rate",defaultValue:0.125,minValue:1e-3,maxValue:1},{name:"ratio",automationRate:"a-rate",defaultValue:4,minValue:1},{name:"attack",automationRate:"a-rate",defaultValue:0.05,minValue:1e-3,maxValue:1e-1},{name:"release",automationRate:"a-rate",defaultValue:0.25,minValue:1e-2,maxValue:1},{name:"outgain",automationRate:"a-rate",defaultValue:1,minValue:0}];}constructor(_H3){super();this._43();const _A3=_G3.parameterDescriptors.find(_I3=>_I3.name==="attack");const _B3=_G3.parameterDescriptors.find(_I3=>_I3.name==="release");
    this._J3=new _x3(_A3.defaultValue,_B3.defaultValue);this._K3=0;}process(_L3,_M3,_N3){const input=_L3[0];const output=_M3[0];const bypass=_N3.bypass;const ingain=_N3.ingain;const outgain=_N3.outgain;const threshold=_N3.threshold;const ratio=_N3.ratio;const attack=_N3.attack;const release=_N3.release;if(input.length===0)return this._53;for(let _b3=0;_b3<input[0].length;++_b3){let frame=input.map(_O3=>_O3[_b3]);output.forEach((_O3,_P3)=>{_O3[_b3]=frame[_P3];});const _Q3=(ingain[_b3]!==undefined)?ingain[_b3]:ingain[0];
    frame=frame.map(_R3=>_R3*=_Q3);const rect=frame.map(_R3=>Math.abs(_R3));const max=Math.max(...rect);const _S3=_T3(max);const _U3=(threshold[_b3]!==undefined)?threshold[_b3]:threshold[0];const _V3=_T3(_U3);const _W3=Math.max(0,_S3-_V3);const _A3=(attack[_b3]!==undefined)?attack[_b3]:attack[0];const _B3=(release[_b3]!==undefined)?release[_b3]:release[0];this._J3._E3(_A3);this._J3._F3(_B3);this._K3=this._J3.process(_W3,this._K3);const _c3=(bypass[_b3]!==undefined)?bypass[_b3]:bypass[0];if(_c3>0)continue;const _q3=(ratio[_b3]!==undefined)?ratio[_b3]:ratio[0];
    const _X3=(this._K3/_q3)-this._K3;const _h3=_Y3(_X3);frame=frame.map(_R3=>_R3*=_h3);const _Z3=(outgain[_b3]!==undefined)?outgain[_b3]:outgain[0];frame=frame.map(_R3=>_R3*=_Z3);output.forEach((_O3,_P3)=>{_O3[_b3]=frame[_P3];});}return this._53;}}function _T3(__3){return 20*Math.log10(__3);}function _Y3(__3){return Math.pow(10,__3/20);}registerProcessor("compressor-processor",_G3);class _04 extends AudioWorkletProcessor{static _14=5.0;static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",
    defaultValue:0,minValue:0,maxValue:1},{name:"time",automationRate:"a-rate",defaultValue:0.2,minValue:0.0,maxValue:_04._14},{name:"feedback",automationRate:"a-rate",defaultValue:0.5,minValue:0.0,maxValue:1.0},{name:"mix",automationRate:"a-rate",defaultValue:0.35,minValue:0.0,maxValue:1.0}];}constructor(_k3){super();this._43();const _l3=_k3.outputChannelCount[0];const _24=(_04._14*sampleRate)+1;this.buffer=new Array(_l3);this._34=new Uint32Array(_l3);for(let c=0;c<_l3;++c)this.buffer[c]=new Float32Array(_24);
    }process(_83,_93,parameters){const input=_83[0];const output=_93[0];const bypass=parameters.bypass;const time=parameters.time;const feedback=parameters.feedback;const mix=parameters.mix;for(let c=0;c<input.length;++c){const _a3=input[c];const _g3=output[c];for(let _b3=0;_b3<_a3.length;++_b3){_g3[_b3]=_a3[_b3];const _U3=(time[_b3]!==undefined)?time[_b3]:time[0];const _44=this._54(c,_U3);const _o3=(feedback[_b3]!==undefined)?feedback[_b3]:feedback[0];const _64=_a3[_b3]+(_44*_o3);this.write(c,_64);const _c3=(bypass[_b3]!==undefined)?bypass[_b3]:bypass[0];
    if(_c3>0.0){continue;}const _r3=(mix[_b3]!==undefined)?mix[_b3]:mix[0];_g3[_b3]*=(1-_r3);_g3[_b3]+=(_44*_r3);}}return this._53;}_54(_74,_t3){const _84=_t3*sampleRate;let _94=(this._34[_74]-~~_84);let _a4=(_94-1);while(_94<0)_94+=this.buffer[_74].length;while(_a4<0)_a4+=this.buffer[_74].length;const frac=_84-~~_84;const _b4=this.buffer[_74][_94];const _c4=this.buffer[_74][_a4];return _b4+(_c4-_b4)*frac;}write(_74,_d4){++this._34[_74];this._34[_74]%=this.buffer[_74].length;this.buffer[_74][this._34[_74]]=_d4;
    }}registerProcessor("delay-processor",_04);class _e4 extends AudioWorkletProcessor{static get parameterDescriptors(){return [];}constructor(){super();this._43();}process(_f4,_g4,_h4){const input=_f4[0];const _i4=_g4[0];const _j4=_g4[1];for(let c=0;c<input.length;++c){const _a3=input[c];const _k4=_i4[c];const _l4=_j4[c];for(let _b3=0;_b3<_a3.length;++_b3){_k4[_b3]=_a3[_b3];_l4[_b3]=_a3[_b3];}}return this._53;}}class _m4 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",
    defaultValue:0,minValue:0,maxValue:1}];}constructor(){super();this._43();}process(_f4,_g4,_h4){const _e3=_f4[0];const _f3=_f4[1];const output=_g4[0];const bypass=_h4.bypass;for(let c=0;c<_f3.length;++c){const _n4=_e3[c];const _o4=_f3[c];const _g3=output[c];for(let _b3=0;_b3<_n4.length;++_b3){const _c3=(bypass[_b3]!==undefined)?bypass[_b3]:bypass[0];if(_c3>0){_g3[_b3]=_o4[_b3];}else {_g3[_b3]=_n4[_b3];}}}return this._53;}}registerProcessor("eq-input",_e4);registerProcessor("eq-output",_m4);class _p4 extends AudioWorkletProcessor{
    static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"gain",automationRate:"a-rate",defaultValue:0.5,minValue:0.0}];}constructor(){super();this._43();}process(_83,_93,parameters){const input=_83[0];const output=_93[0];const bypass=parameters.bypass;const gain=parameters.gain;for(let c=0;c<input.length;++c){const _a3=input[c];const _g3=output[c];for(let _b3=0;_b3<_a3.length;++_b3){_g3[_b3]=_a3[_b3];const _c3=(bypass[_b3]!==undefined)?bypass[_b3]:bypass[0];
    if(_c3>0.0){continue;}const _h3=(gain[_b3]!==undefined)?gain[_b3]:gain[0];_g3[_b3]*=_h3;}}return this._53;}}registerProcessor("gain-processor",_p4);class _q4 extends AudioWorkletProcessor{static get parameterDescriptors(){const _r4=Math.min(sampleRate/2.0,20000.0);return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"freq",automationRate:"a-rate",defaultValue:Math.min(5000.0,_r4),minValue:10.0,maxValue:_r4},{name:"q",automationRate:"a-rate",defaultValue:1.0,minValue:1.0,
    maxValue:100.0},{name:"gain",automationRate:"a-rate",defaultValue:1e-2,minValue:1e-6}];}constructor(_k3){super();this._43();const _l3=_k3.outputChannelCount[0];this._s4=0;this._t4=0;this._u4=0;this._v4=0;this._w4=0;this._x4=new Float32Array(_l3);this._y4=new Float32Array(_l3);this._z4=new Float32Array(_l3);this._A4=new Float32Array(_l3);this._B4=-1;this._C4=-1;this._D4=-1;}process(_83,_93,parameters){const input=_83[0];const output=_93[0];const bypass=parameters.bypass;const freq=parameters.freq;const q=parameters.q;
    const gain=parameters.gain;const _E4=(freq.length===1&&q.length===1&&gain.length===1);if(_E4)this._F4(freq[0],q[0],gain[0]);for(let c=0;c<input.length;++c){const _a3=input[c];const _g3=output[c];for(let _b3=0;_b3<_a3.length;++_b3){if(_E4===false){const _o3=(freq[_b3]!==undefined)?freq[_b3]:freq[0];const _G4=(q[_b3]!==undefined)?q[_b3]:q[0];const _h3=(gain[_b3]!==undefined)?gain[_b3]:gain[0];this._F4(_o3,_G4,_h3);}const _H4=this._u4*_a3[_b3]+this._v4*this._x4[c]+this._w4*this._y4[c]-this._s4*this._z4[c]-this._t4*this._A4[c];
    this._y4[c]=this._x4[c];this._x4[c]=_a3[_b3];this._A4[c]=this._z4[c];this._z4[c]=_H4;const _c3=(bypass[_b3]!==undefined)?bypass[_b3]:bypass[0];_g3[_b3]=(_c3>0)?_a3[_b3]:_H4;}}return this._53;}_F4(_I4,_J4,_K4){if(_I4===this._B4&&_J4===this._C4&&_K4===this._D4)return;const _L4=2*Math.PI*_I4/sampleRate;const _M4=Math.cos(_L4);const _N4=Math.sqrt(_K4);const _O4=_N4+1;const _P4=_N4-1;const _Q4=_O4*_M4;const _R4=_P4*_M4;const _S4=_O4-_R4;const _T4=_O4+_R4;const alpha=Math.sin(_L4)/(2*_J4);const _U4=(2*Math.sqrt(_N4)*alpha);
    const _V4=_S4+_U4;const _s4=2*(_P4-_Q4);const _t4=_S4-_U4;const _u4=_N4*(_T4+_U4);const _v4=-2*_N4*(_P4+_Q4);const _w4=_N4*(_T4-_U4);this._s4=_s4/_V4;this._t4=_t4/_V4;this._u4=_u4/_V4;this._v4=_v4/_V4;this._w4=_w4/_V4;this._B4=_I4;this._C4=_J4;this._D4=_K4;}}registerProcessor("hi-shelf-processor",_q4);class _W4 extends AudioWorkletProcessor{static get parameterDescriptors(){const _X4=Math.min(sampleRate/2.0,20000.0);return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"cutoff",
    automationRate:"a-rate",defaultValue:Math.min(1500.0,_X4),minValue:10.0,maxValue:_X4},{name:"q",automationRate:"a-rate",defaultValue:1.5,minValue:1.0,maxValue:100.0}];}constructor(_k3){super();this._43();const _l3=_k3.outputChannelCount[0];this._s4=0;this._t4=0;this._u4=0;this._v4=0;this._w4=0;this._x4=new Float32Array(_l3);this._y4=new Float32Array(_l3);this._z4=new Float32Array(_l3);this._A4=new Float32Array(_l3);this._Y4=-1;this._C4=-1;}process(_83,_93,parameters){const input=_83[0];const output=_93[0];
    const bypass=parameters.bypass;const cutoff=parameters.cutoff;const q=parameters.q;const _E4=(cutoff.length===1&&q.length===1);if(_E4)this._F4(cutoff[0],q[0]);for(let c=0;c<input.length;++c){const _a3=input[c];const _g3=output[c];for(let _b3=0;_b3<_a3.length;++_b3){if(_E4===false){const c=(cutoff[_b3]!==undefined)?cutoff[_b3]:cutoff[0];const _G4=(q[_b3]!==undefined)?q[_b3]:q[0];this._F4(c,_G4);}const _H4=this._u4*_a3[_b3]+this._v4*this._x4[c]+this._w4*this._y4[c]-this._s4*this._z4[c]-this._t4*this._A4[c];this._y4[c]=this._x4[c];
    this._x4[c]=_a3[_b3];this._A4[c]=this._z4[c];this._z4[c]=_H4;const _c3=(bypass[_b3]!==undefined)?bypass[_b3]:bypass[0];_g3[_b3]=(_c3>0)?_a3[_b3]:_H4;}}return this._53;}_F4(_Z4,_J4){if(_Z4===this._Y4&&_J4===this._C4)return;const _L4=2*Math.PI*_Z4/sampleRate;const alpha=Math.sin(_L4)/(2*_J4);const _M4=Math.cos(_L4);const _V4=1+alpha;const _s4=-2*_M4;const _t4=1-alpha;const _u4=(1+_M4)/2;const _v4=-1-_M4;const _w4=(1+_M4)/2;this._s4=_s4/_V4;this._t4=_t4/_V4;this._u4=_u4/_V4;this._v4=_v4/_V4;this._w4=_w4/_V4;this._Y4=_Z4;
    this._C4=_J4;}}registerProcessor("hpf2-processor",_W4);class __4 extends AudioWorkletProcessor{static get parameterDescriptors(){const _r4=Math.min(sampleRate/2.0,20000.0);return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"freq",automationRate:"a-rate",defaultValue:Math.min(500.0,_r4),minValue:10.0,maxValue:_r4},{name:"q",automationRate:"a-rate",defaultValue:1.0,minValue:1.0,maxValue:100.0},{name:"gain",automationRate:"a-rate",defaultValue:1e-2,minValue:1e-6}];}
    constructor(_k3){super();this._43();const _l3=_k3.outputChannelCount[0];this._s4=0;this._t4=0;this._u4=0;this._v4=0;this._w4=0;this._x4=new Float32Array(_l3);this._y4=new Float32Array(_l3);this._z4=new Float32Array(_l3);this._A4=new Float32Array(_l3);this._B4=-1;this._C4=-1;this._D4=-1;}process(_83,_93,parameters){const input=_83[0];const output=_93[0];const bypass=parameters.bypass;const freq=parameters.freq;const q=parameters.q;const gain=parameters.gain;const _E4=(freq.length===1&&q.length===1&&gain.length===1);
    if(_E4)this._F4(freq[0],q[0],gain[0]);for(let c=0;c<input.length;++c){const _a3=input[c];const _g3=output[c];for(let _b3=0;_b3<_a3.length;++_b3){if(_E4===false){const _o3=(freq[_b3]!==undefined)?freq[_b3]:freq[0];const _G4=(q[_b3]!==undefined)?q[_b3]:q[0];const _h3=(gain[_b3]!==undefined)?gain[_b3]:gain[0];this._F4(_o3,_G4,_h3);}const _H4=this._u4*_a3[_b3]+this._v4*this._x4[c]+this._w4*this._y4[c]-this._s4*this._z4[c]-this._t4*this._A4[c];this._y4[c]=this._x4[c];this._x4[c]=_a3[_b3];this._A4[c]=this._z4[c];
    this._z4[c]=_H4;const _c3=(bypass[_b3]!==undefined)?bypass[_b3]:bypass[0];_g3[_b3]=(_c3>0)?_a3[_b3]:_H4;}}return this._53;}_F4(_I4,_J4,_K4){if(_I4===this._B4&&_J4===this._C4&&_K4===this._D4)return;const _L4=2*Math.PI*_I4/sampleRate;const _M4=Math.cos(_L4);const _N4=Math.sqrt(_K4);const _O4=_N4+1;const _P4=_N4-1;const _Q4=_O4*_M4;const _R4=_P4*_M4;const _S4=_O4-_R4;const _T4=_O4+_R4;const alpha=Math.sin(_L4)/(2*_J4);const _U4=(2*Math.sqrt(_N4)*alpha);const _V4=_T4+_U4;const _s4=-2*(_P4+_Q4);const _t4=_T4-_U4;const _u4=_N4*(_S4+_U4);
    const _v4=2*_N4*(_P4-_Q4);const _w4=_N4*(_S4-_U4);this._s4=_s4/_V4;this._t4=_t4/_V4;this._u4=_u4/_V4;this._v4=_v4/_V4;this._w4=_w4/_V4;this._B4=_I4;this._C4=_J4;this._D4=_K4;}}registerProcessor("lo-shelf-processor",__4);class _05 extends AudioWorkletProcessor{static get parameterDescriptors(){const _X4=Math.min(sampleRate/2.0,20000.0);return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"cutoff",automationRate:"a-rate",defaultValue:Math.min(500.0,_X4),minValue:10.0,maxValue:_X4}
    ,{name:"q",automationRate:"a-rate",defaultValue:1.5,minValue:1.0,maxValue:100.0}];}constructor(_k3){super();this._43();const _l3=_k3.outputChannelCount[0];this._s4=0;this._t4=0;this._u4=0;this._v4=0;this._w4=0;this._x4=new Float32Array(_l3);this._y4=new Float32Array(_l3);this._z4=new Float32Array(_l3);this._A4=new Float32Array(_l3);this._Y4=-1;this._C4=-1;}process(_83,_93,parameters){const input=_83[0];const output=_93[0];const bypass=parameters.bypass;const cutoff=parameters.cutoff;const q=parameters.q;const _E4=(cutoff.length===1&&q.length===1);
    if(_E4)this._F4(cutoff[0],q[0]);for(let c=0;c<input.length;++c){const _a3=input[c];const _g3=output[c];for(let _b3=0;_b3<_a3.length;++_b3){if(_E4===false){const c=(cutoff[_b3]!==undefined)?cutoff[_b3]:cutoff[0];const _G4=(q[_b3]!==undefined)?q[_b3]:q[0];this._F4(c,_G4);}const _H4=this._u4*_a3[_b3]+this._v4*this._x4[c]+this._w4*this._y4[c]-this._s4*this._z4[c]-this._t4*this._A4[c];this._y4[c]=this._x4[c];this._x4[c]=_a3[_b3];this._A4[c]=this._z4[c];this._z4[c]=_H4;const _c3=(bypass[_b3]!==undefined)?bypass[_b3]:bypass[0];
    _g3[_b3]=(_c3>0)?_a3[_b3]:_H4;}}return this._53;}_F4(_Z4,_J4){if(_Z4===this._Y4&&_J4===this._C4)return;const _L4=2*Math.PI*_Z4/sampleRate;const alpha=Math.sin(_L4)/(2*_J4);const _M4=Math.cos(_L4);const _V4=1+alpha;const _s4=-2*_M4;const _t4=1-alpha;const _u4=(1-_M4)/2;const _v4=1-_M4;const _w4=(1-_M4)/2;this._s4=_s4/_V4;this._t4=_t4/_V4;this._u4=_u4/_V4;this._v4=_v4/_V4;this._w4=_w4/_V4;this._Y4=_Z4;this._C4=_J4;}}registerProcessor("lpf2-processor",_05);class _15 extends AudioWorkletProcessor{static get parameterDescriptors(){
    const _r4=Math.min(sampleRate/2.0,20000.0);return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"freq",automationRate:"a-rate",defaultValue:Math.min(1500.0,_r4),minValue:10.0,maxValue:_r4},{name:"q",automationRate:"a-rate",defaultValue:1.0,minValue:1.0,maxValue:100.0},{name:"gain",automationRate:"a-rate",defaultValue:1e-2,minValue:1e-6}];}constructor(_k3){super();this._43();const _l3=_k3.outputChannelCount[0];this._s4=0;this._t4=0;this._u4=0;this._v4=0;this._w4=0;
    this._x4=new Float32Array(_l3);this._y4=new Float32Array(_l3);this._z4=new Float32Array(_l3);this._A4=new Float32Array(_l3);this._B4=-1;this._C4=-1;this._D4=-1;}process(_83,_93,parameters){const input=_83[0];const output=_93[0];const bypass=parameters.bypass;const freq=parameters.freq;const q=parameters.q;const gain=parameters.gain;const _E4=(freq.length===1&&q.length===1&&gain.length===1);if(_E4)this._F4(freq[0],q[0],gain[0]);for(let c=0;c<input.length;++c){const _a3=input[c];const _g3=output[c];for(let _b3=0;
    _b3<_a3.length;++_b3){if(_E4===false){const _o3=(freq[_b3]!==undefined)?freq[_b3]:freq[0];const _G4=(q[_b3]!==undefined)?q[_b3]:q[0];const _h3=(gain[_b3]!==undefined)?gain[_b3]:gain[0];this._F4(_o3,_G4,_h3);}const _H4=this._u4*_a3[_b3]+this._v4*this._x4[c]+this._w4*this._y4[c]-this._s4*this._z4[c]-this._t4*this._A4[c];this._y4[c]=this._x4[c];this._x4[c]=_a3[_b3];this._A4[c]=this._z4[c];this._z4[c]=_H4;const _c3=(bypass[_b3]!==undefined)?bypass[_b3]:bypass[0];_g3[_b3]=(_c3>0)?_a3[_b3]:_H4;}}return this._53;
    }_F4(_I4,_J4,_K4){if(_I4===this._B4&&_J4===this._C4&&_K4===this._D4)return;const _L4=2*Math.PI*_I4/sampleRate;const _M4=Math.cos(_L4);const _N4=Math.sqrt(_K4);const alpha=Math.sin(_L4)/(2*_J4);const _25=alpha/_N4;const _35=alpha*_N4;const _V4=1+_25;const _s4=-2*_M4;const _t4=1-_25;const _u4=1+_35;const _v4=_s4;const _w4=1-_35;this._s4=_s4/_V4;this._t4=_t4/_V4;this._u4=_u4/_V4;this._v4=_v4/_V4;this._w4=_w4/_V4;this._B4=_I4;this._C4=_J4;this._D4=_K4;}}registerProcessor("peak-eq-processor",_15);class _45{constructor(_55){
    this._65=0;this._75=0;this.feedback=0;this._85=0;this.buffer=new Float32Array(_55);this._95=0;}process(_d4){const out=this.buffer[this._95];this._85=(this._85*this._65)+(out*this._75);this.buffer[this._95]=_d4+(this._85*this.feedback);++this._95;this._95%=this.buffer.length;return out;}_a5(_b5){this.feedback=Math.min(Math.max(0,_b5),1);}_c5(_d5){this._65=Math.min(Math.max(0,_d5),1);this._75=1-this._65;}}class _e5{constructor(_55){this.feedback=0;this.buffer=new Float32Array(_55);this._95=0;}process(_d4){
    const out=this.buffer[this._95];this.buffer[this._95]=_d4+(out*this.feedback);++this._95;this._95%=this.buffer.length;return(out-_d4);}_a5(_b5){this.feedback=Math.min(Math.max(0,_b5),1);}}class _f5 extends AudioWorkletProcessor{static _g5=8;static _h5=4;static _i5=0.015;static _j5=0.4;static _k5=0.28;static _l5=0.7;static _m5=[1116,1188,1277,1356,1422,1491,1557,1617];static _n5=[1139,1211,1300,1379,1445,1514,1580,1640];static _o5=[556,441,341,225];static _p5=[579,464,364,248];static get parameterDescriptors(){return [{
    name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"size",automationRate:"a-rate",defaultValue:0.7,minValue:0.0,maxValue:1.0},{name:"damp",automationRate:"a-rate",defaultValue:0.1,minValue:0.0,maxValue:1.0},{name:"mix",automationRate:"a-rate",defaultValue:0.35,minValue:0.0,maxValue:1.0}];}constructor(_k3){super();this._43();const _l3=_k3.outputChannelCount[0];this._q5=-1;this._r5=-1;this._s5=new Array(_l3);this._t5=new Array(_l3);const _u5=[_f5._m5,_f5._n5];const _v5=[_f5._o5,
    _f5._p5];for(let c=0;c<_l3;++c){this._s5[c]=new Array(_f5._g5);this._t5[c]=new Array(_f5._h5);for(let i=0;i<_f5._g5;++i)this._s5[c][i]=new _45(_u5[c%_u5.length][i]);for(let i=0;i<_f5._h5;++i)this._t5[c][i]=new _e5(_v5[c%_v5.length][i]);}this._w5(0.5);this._c5(0.5);for(let c=0;c<_l3;++c)for(let i=0;i<_f5._h5;++i)this._t5[c][i]._a5(0.5);}process(_83,_93,parameters){const input=_83[0];const output=_93[0];const bypass=parameters.bypass;const size=parameters.size;const damp=parameters.damp;const mix=parameters.mix;
    for(let c=0;c<input.length;++c){const _a3=input[c];const _g3=output[c];for(let _b3=0;_b3<_a3.length;++_b3){const _b3=(size[_b3]!==undefined)?size[_b3]:size[0];const _x5=(damp[_b3]!==undefined)?damp[_b3]:damp[0];this._w5(_b3);this._c5(_x5);_g3[_b3]=_a3[_b3];let out=0;const _p3=_a3[_b3]*_f5._i5;for(let i=0;i<_f5._g5;++i)out+=this._s5[c][i].process(_p3);for(let i=0;i<_f5._h5;++i)out=this._t5[c][i].process(out);const _c3=(bypass[_b3]!==undefined)?bypass[_b3]:bypass[0];if(_c3>0.0){continue;}const _r3=(mix[_b3]!==undefined)?mix[_b3]:mix[0];
    _g3[_b3]*=(1-_r3);_g3[_b3]+=(out*_r3);}}return this._53;}_w5(_55){if(_55===this._q5)return;const size=(_55*_f5._k5)+_f5._l5;for(let c=0;c<this._s5.length;++c)for(let i=0;i<_f5._g5;++i)this._s5[c][i]._a5(size);this._q5=_55;}_c5(_d5){if(_d5===this._r5)return;const damp=_d5*_f5._j5;for(let c=0;c<this._s5.length;++c)for(let i=0;i<_f5._g5;++i)this._s5[c][i]._c5(damp);this._r5=_d5;}}registerProcessor("reverb1-processor",_f5);class _y5 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",
    automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"rate",automationRate:"a-rate",defaultValue:5.0,minValue:0.0,maxValue:20.0},{name:"intensity",automationRate:"a-rate",defaultValue:1.0,minValue:0.0,maxValue:1.0},{name:"offset",automationRate:"a-rate",defaultValue:0.0,minValue:0.0,maxValue:1.0},{name:"shape",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:4}];}constructor(_k3){super();this._43();const _l3=_k3.outputChannelCount[0];this._z5=new Array(_l3).fill(1.0);this._A5=new Array(_l3).fill(0.0);
    this._B5=new Array(_l3).fill(_C5._D5._E5);this._F5=new Array(_l3);for(let c=0;c<_l3;++c){this._F5[c]=new _G5();this._F5[c]._H5(sampleRate);this._F5[c]._I5(this._z5[c]);this._F5[c]._J5(this._B5[c]);if(c%2===1){this._F5[c]._K5(this._A5[c]);}}}process(_83,_93,parameters){const input=_83[0];const output=_93[0];const bypass=parameters.bypass;const rate=parameters.rate;const intensity=parameters.intensity;const offset=parameters.offset;const shape=parameters.shape;for(let c=0;c<input.length;++c){const _a3=input[c];
    const _g3=output[c];for(let _b3=0;_b3<_a3.length;++_b3){_g3[_b3]=_a3[_b3];const _q3=(rate[_b3]!==undefined)?rate[_b3]:rate[0];const _L5=(offset[_b3]!==undefined)?offset[_b3]:offset[0];const _M5=(shape[_b3]!==undefined)?shape[_b3]:shape[0];this._N5(c,_q3,_L5,_M5);const _O5=this._F5[c]._54();const _c3=(bypass[_b3]!==undefined)?bypass[_b3]:bypass[0];if(_c3>0.0){continue;}const i=(intensity[_b3]!==undefined)?intensity[_b3]:intensity[0];const out=_a3[_b3]*_O5*i;_g3[_b3]*=(1.0-i);_g3[_b3]+=out;}}return this._53;
    }_N5(_74,_P5,_Q5,_R5){if(_P5!==this._z5[_74]){this._F5[_74]._I5(_P5);this._z5[_74]=_P5;}if(_Q5!==this._A5[_74]){if(_74%2===1){this._F5[_74]._K5(_Q5);}this._A5[_74]=_Q5;}if(_R5!==this._B5[_74]){this._F5[_74]._J5(_R5);this._B5[_74]=_R5;}}}registerProcessor("tremolo-processor",_y5);function _C5(){}_C5._D5={_E5:0,_S5:1,_T5:2,_U5:3,_V5:4,_W5:5};_C5._X5=function(_Y5){return 1.0-_Y5;};_C5._Z5=function(_Y5){return _Y5;};_C5.__5=function(_Y5){return 0.5*(Math.sin((_Y5*2.0*Math.PI)-(Math.PI/2.0))+1.0);};_C5._06=function(_Y5){
    if(_Y5<0.5){return 0.0;}return 1.0;};_C5._16=function(_Y5){if(_Y5<0.5){return 2.0*_Y5;}return 2.0-(2.0*_Y5);};_C5._26=[_C5._X5,_C5._Z5,_C5.__5,_C5._06,_C5._16];_36._46=512;_36._56=1.0/_36._46;function _36(_66){this.data=new Float32Array(_36._46);for(let i=0;i<_36._46;++i){this.data[i]=_66(i*_36._56);}}_36.prototype._54=function(_Y5){_Y5=Math.max(0.0,_Y5);_Y5=Math.min(_Y5,1.0);const _76=_Y5*_36._46;const _86=~~_76;const _96=_76-_86;let _94=_86;let _a4=_94+1;if(_94>=_36._46){_94-=_36._46;}if(_a4>=_36._46){_a4-=_36._46;
    }const _b4=this.data[_94];const _c4=this.data[_a4];return _b4+(_c4-_b4)*_96;};_G5._a6=[];_G5._b6=false;_G5._c6=0.0;_G5._r4=20.0;function _G5(){this._d6=48000;this.shape=_C5._D5._T5;this.freq=1.0;this._e6=0.0;this._56=0.0;this._f6=0.0;if(_G5._b6==true){return;}for(let i=0;i<_C5._D5._W5;++i){_G5._a6[i]=new _36(_C5._26[i]);}_G5._b6=true;}_G5._g6=function(){return(_G5._b6==true);};_G5.prototype._H5=function(_h6){this._d6=_h6;this._i6();};_G5.prototype._I5=function(_I4){_I4=Math.max(_G5._c6,_I4);_I4=Math.min(_I4,
    _G5._r4);this.freq=_I4;this._i6();};_G5.prototype._K5=function(_Q5){_Q5=Math.max(0.0,_Q5);_Q5=Math.min(_Q5,1.0);const _j6=_Q5-this._f6;this._f6=_Q5;this._e6+=_j6;while(this._e6>=1.0){this._e6-=1.0;}while(this._e6<0.0){this._e6+=1.0;}};_G5.prototype._J5=function(_R5){_R5=Math.max(0,_R5);_R5=Math.min(_R5,_C5._D5._W5-1);this.shape=_R5;};_G5.prototype._54=function(){const result=_G5._a6[this.shape]._54(this._e6);this._e6+=this._56;while(this._e6>=1.0){this._e6-=1.0;}return result;};_G5.prototype._i6=function(){
    this._56=this.freq/this._d6;};