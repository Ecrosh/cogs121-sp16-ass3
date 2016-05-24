    var config1 = liquidFillGaugeDefaultSettings();
    config1.textVertPosition = 0.8;
    config1.waveAnimateTime = 5000;
    config1.waveHeight = 0.05;
    config1.waveOffset = 0.25;
    config1.valueCountUp = false;
    config1.displayPercent = false;
	config1.waveCount = 3;
	var gauge1 = loadLiquidFillGauge("fillgauge1", 50, config1);
    
    var config2 = liquidFillGaugeDefaultSettings();
	config2.circleColor = "#413639";
    config2.textColor = "#413639";
    config2.waveTextColor = "#413639";
    config2.waveColor = "#745220";
    config2.textVertPosition = 0.8;
    config2.waveAnimateTime = 5000;
    config2.waveHeight = 0.05;
    config2.waveOffset = 0.25;
    config2.valueCountUp = false;
    config2.displayPercent = false;
	config2.waveCount = 3;
	var gauge2= loadLiquidFillGauge("fillgauge2", 45, config2);


    var config3 = liquidFillGaugeDefaultSettings();
	config3.circleColor = "#aa7d39";
    config3.textColor = "#aa7d39";
    config3.waveTextColor = "#aa7d39";
    config3.waveColor = "#d4ab6a";
    config3.textVertPosition = 0.8;
    config3.waveAnimateTime = 5000;
    config3.waveHeight = 0.05;
    config3.waveOffset = 0.25;
    config3.valueCountUp = false;
    config3.displayPercent = false;
	config3.waveCount = 3;
	var gauge3 = loadLiquidFillGauge("fillgauge3", 40, config3);
    
    var config4 = liquidFillGaugeDefaultSettings();
	config4.circleColor = "#5b1a23";
    config4.textColor = "#5b1a23";
    config4.waveTextColor = "#5b1a23";
    config4.waveColor = "#a72a3c";
    config4.textVertPosition = 0.8;
    config4.waveAnimateTime = 5000;
    config4.waveHeight = 0.05;
    config4.waveOffset = 0.25;
    config4.valueCountUp = false;
    config4.displayPercent = false;
	config4.waveCount = 3;
	var gauge4 = loadLiquidFillGauge("fillgauge4", 35, config4);
	
	var config5 = liquidFillGaugeDefaultSettings();
	config5.circleColor = "#848081";
    config5.textColor = "#848081";
    config5.waveTextColor = "#848081";
    config5.waveColor = "#d8d3d4";
    config5.textVertPosition = 0.8;
    config5.waveAnimateTime = 5000;
    config5.waveHeight = 0.05;
    config5.waveOffset = 0.25;
    config5.valueCountUp = false;
    config5.displayPercent = false;
	config5.waveCount = 3;
	var gauge5 = loadLiquidFillGauge("fillgauge5", 30, config5);
	
	function NewValue(){
        if(Math.random() > .5){
            return Math.round(Math.random()*100);
        } else {
            return (Math.random()*100).toFixed(1);
        }
    }