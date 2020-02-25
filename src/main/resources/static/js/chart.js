
/**
 * chart 객체
 */
let charts = {
  base_data: {
    createChart(name, data) {
      am4core.ready(() => {

        am4core.useTheme(am4themes_animated);

        let chart = am4core.create(name, am4charts.XYChart);
        chart.data = data;
        chart.dateFormatter.inputDateFormat = "yyyyMMdd";

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        let series = chart.series.push(new am4charts.LineSeries());
        this._setSeries(series);

        let bullet = series.bullets.push(new am4charts.CircleBullet());
        this._setBullet(bullet);

        let bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;

        this._setCursor(chart, dateAxis, series);
        this._setScroll(chart, series);

        dateAxis.start = 0.79;
        dateAxis.keepSelection = true;
        document.querySelector(".keywordTransition").style.display = "block";

      });
    },

    _setSeries(series) {
      series.dataFields.valueY = "frequency";
      series.dataFields.dateX = "date";
      series.tooltipText = "{frequency}"
      series.strokeWidth = 2;
      series.minBulletDistance = 15;

      series.tooltip.background.cornerRadius = 20;
      series.tooltip.background.strokeOpacity = 0;
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.label.minWidth = 40;
      series.tooltip.label.minHeight = 40;
      series.tooltip.label.textAlign = "middle";
      series.tooltip.label.textValign = "middle";
    },

    _setBullet(bullet) {
      bullet.circle.strokeWidth = 2;
      bullet.circle.radius = 4;
      bullet.circle.fill = am4core.color("#2AA198");
    },

    _setCursor(chart, dateAxis, series) {
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.behavior = "panXY";
      chart.cursor.xAxis = dateAxis;
      chart.cursor.snapToSeries = series;
    },

    _setScroll(chart, series) {
      chart.scrollbarY = new am4core.Scrollbar();
      chart.scrollbarY.parent = chart.leftAxesContainer;
      chart.scrollbarY.toBack();

      chart.scrollbarX = new am4charts.XYChartScrollbar();
      chart.scrollbarX.series.push(series);
      chart.scrollbarX.parent = chart.bottomAxesContainer;
    }
  },

  word_cloud: {
    createChart(name, data) {
      am4core.ready(() => {
        // document.querySelector(".case").style.backgroundColor = "white";

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end


        let chart = am4core.create(name, am4plugins_wordCloud.WordCloud);
        let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
        this._setSeries(series, data);
      });
    },

    _setSeries(series, data) {
      series.accuracy = 4;
      series.step = 15;
      series.rotationThreshold = 0.7;
      series.maxCount = 200;
      series.minWordLength = 2;
      series.data = data;
      series.dataFields.word = "label";
      series.dataFields.value = "value"
      series.labels.template.tooltipText = "{word}: {value}";
      series.fontFamily = "Courier New";
      series.maxFontSize = am4core.percent(30);
      document.querySelector(".association").style.display = "block";
    }
  },

  stacked_column: {
    createChart(name, data) {
      am4core.ready(() => {
        document.querySelector("#" + name).style.backgroundColor = "white";
        document.querySelector("#" + name).style.boxShadow = "0 .125rem .25rem rgba(0,0,0,.075)";

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        let chart = am4core.create(name, am4charts.XYChart);
        this._setChart(chart, data);
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        this._setAxis(categoryAxis, valueAxis);
        let series1 = chart.series.push(new am4charts.ColumnSeries());
        let bullet1 = series1.bullets.push(new am4charts.LabelBullet());
        this._setSeries1(series1, bullet1);
        let series2 = chart.series.push(new am4charts.ColumnSeries());
        let bullet2 = series2.bullets.push(new am4charts.LabelBullet());
        this._setSeries2(series2, bullet2);
        chart.scrollbarX = new am4core.Scrollbar();
      });
    },

    _setChart(chart, data) {
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.data = data;

      chart.colors.step = 2;
      chart.padding(30, 30, 10, 30);
      chart.legend = new am4charts.Legend();
    },

    _setAxis(categoryAxis, valueAxis) {
      categoryAxis.dataFields.category = "date";
      categoryAxis.renderer.grid.template.location = 0;

      valueAxis.min = 0;
      valueAxis.max = 100;
      valueAxis.strictMinMax = true;
      valueAxis.calculateTotals = true;
      valueAxis.renderer.minWidth = 50;
      valueAxis.title.text = "비율";
    },

    _setSeries1(series1, bullet1) {
      series1.columns.template.width = am4core.percent(80);
      series1.columns.template.tooltipText =
        "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
      series1.name = "긍정";
      series1.dataFields.categoryX = "date";
      series1.dataFields.valueY = "positive";
      series1.dataFields.valueYShow = "totalPercent";
      series1.dataItems.template.locations.categoryX = 0.5;
      series1.stacked = true;
      series1.tooltip.pointerOrientation = "vertical";
      series1.columns.template.strokeWidth = "0";

      bullet1.interactionsEnabled = false;
      bullet1.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
      bullet1.label.fill = am4core.color("#ffffff");
      bullet1.locationY = 0.5;
    },

    _setSeries2(series2, bullet2) {
      series2.columns.template.width = am4core.percent(80);
      series2.columns.template.tooltipText =
        "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
      series2.name = "부정";
      series2.dataFields.categoryX = "date";
      series2.dataFields.valueY = "negative";
      series2.dataFields.valueYShow = "totalPercent";
      series2.dataItems.template.locations.categoryX = 0.5;
      series2.stacked = true;
      series2.tooltip.pointerOrientation = "vertical";
      series2.columns.template.strokeWidth = "0";
      series2.columns.template.adapter.add("fill", function (fill, target) {
        return am4core.color("#FF8E7F");
      });

      bullet2.interactionsEnabled = false;
      bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
      bullet2.locationY = 0.5;
      bullet2.label.fill = am4core.color("#ffffff");
      document.querySelector(".polarity").style.display = "block";
    }
  },

}
