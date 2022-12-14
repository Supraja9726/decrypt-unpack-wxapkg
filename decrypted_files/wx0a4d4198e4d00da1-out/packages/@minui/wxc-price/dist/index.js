Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
   * 小数保留处理
   * @param priceNum 价格数字（单位元）
   * @param len 保留的小数长度
   * @param dir 取整方向，f (floor) 为向下取整，默认值；c（ceiling）为向上取整
   */ function getDecimal(priceNum, len, dir) {
    if (!priceNum || !len) {
        return false;
    }
    dir = dir || "f";
    priceNum = parseFloat(priceNum, 10);
    len = parseInt(len, 10);
    if (dir === "f") {
        var intNumStr = priceNum.toString().split(".")[0];
        var decimalNumStr = priceNum.toString().split(".")[1] || "00";
        if (decimalNumStr.length < 2) {
            decimalNumStr += "0";
        }
        return intNumStr + "." + decimalNumStr.substring(0, len);
    } else {
        return priceNum.toFixed(len);
    }
}

exports.default = Component({
    behaviors: [],
    properties: {
        symbol: {
            type: String,
            value: "￥"
        },
        value: {
            type: [ Number, String ],
            value: ""
        },
        icon: {
            type: [ String ],
            value: ""
        },
        status: {
            type: String,
            value: ""
        },
        delColor: {
            type: String,
            value: "#999"
        },
        decimal: {
            type: String,
            value: "2"
        },
        decimalNum: {
            type: [ Number, String ],
            value: ""
        }
    },
    data: {},
    methods: {},
    attached: function attached() {
        if (this.data.value) {
            var value = this.data.value;
            switch (this.data.decimal) {
              // 保留一位小数
                case "1":
                {
                    value = getDecimal(this.data.value, 1);
                    break;
                }

                // 只显示整数
                              case "none":
                {
                    value = parseInt(this.data.value);
                    break;
                }

                // 小数部分缩小
                              case "small":
                {
                    value = parseInt(this.data.value).toString().trim();
                    this.setData({
                        decimalNum: (this.data.value.toString().split(".")[1] || "00").trim()
                    });
                    break;
                }

              default:
                {
                    value = getDecimal(this.data.value, 2);
                    break;
                }
            }
            this.setData({
                value: value
            });
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4YyJdLCJuYW1lcyI6WyJnZXREZWNpbWFsIiwicHJpY2VOdW0iLCJsZW4iLCJkaXIiLCJwYXJzZUZsb2F0IiwicGFyc2VJbnQiLCJpbnROdW1TdHIiLCJ0b1N0cmluZyIsInNwbGl0IiwiZGVjaW1hbE51bVN0ciIsImxlbmd0aCIsInN1YnN0cmluZyIsInRvRml4ZWQiLCJiZWhhdmlvcnMiLCJwcm9wZXJ0aWVzIiwic3ltYm9sIiwidHlwZSIsIlN0cmluZyIsInZhbHVlIiwiTnVtYmVyIiwiaWNvbiIsInN0YXR1cyIsImRlbENvbG9yIiwiZGVjaW1hbCIsImRlY2ltYWxOdW0iLCJkYXRhIiwibWV0aG9kcyIsImF0dGFjaGVkIiwidHJpbSIsInNldERhdGEiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7OztBQU1FLFNBQVNBLFVBQVQsQ0FBb0JDLFFBQXBCLEVBQThCQyxHQUE5QixFQUFtQ0MsR0FBbkMsRUFBd0M7QUFDdEMsTUFBSSxDQUFDRixRQUFELElBQWEsQ0FBQ0MsR0FBbEIsRUFBdUI7QUFDckIsV0FBTyxLQUFQO0FBQ0Q7O0FBRURDLFFBQU1BLE9BQU8sR0FBYjtBQUNBRixhQUFXRyxXQUFXSCxRQUFYLEVBQXFCLEVBQXJCLENBQVg7QUFDQUMsUUFBTUcsU0FBU0gsR0FBVCxFQUFjLEVBQWQsQ0FBTjs7QUFFQSxNQUFJQyxRQUFRLEdBQVosRUFBaUI7QUFDZixRQUFJRyxZQUFZTCxTQUFTTSxRQUFULEdBQW9CQyxLQUFwQixDQUEwQixHQUExQixFQUErQixDQUEvQixDQUFoQjtBQUNBLFFBQUlDLGdCQUFnQlIsU0FBU00sUUFBVCxHQUFvQkMsS0FBcEIsQ0FBMEIsR0FBMUIsRUFBK0IsQ0FBL0IsS0FBcUMsSUFBekQ7QUFDQSxRQUFJQyxjQUFjQyxNQUFkLEdBQXVCLENBQTNCLEVBQThCO0FBQzFCRCx1QkFBaUIsR0FBakI7QUFDSDs7QUFFRCxXQUFPSCxZQUFZLEdBQVosR0FBa0JHLGNBQWNFLFNBQWQsQ0FBd0IsQ0FBeEIsRUFBMkJULEdBQTNCLENBQXpCO0FBQ0QsR0FSRCxNQVFPO0FBQ0wsV0FBT0QsU0FBU1csT0FBVCxDQUFpQlYsR0FBakIsQ0FBUDtBQUNEO0FBQ0Y7OztBQU1DVyxhQUFXLEU7QUFDWEMsY0FBWTtBQUNWQyxZQUFRO0FBQ05DLFlBQU1DLE1BREE7QUFFTkMsYUFBTztBQUZELEtBREU7QUFLVkEsV0FBTztBQUNMRixZQUFNLENBQUNHLE1BQUQsRUFBU0YsTUFBVCxDQUREO0FBRUxDLGFBQU87QUFGRixLQUxHO0FBU1ZFLFVBQU07QUFDSkosWUFBTSxDQUFDQyxNQUFELENBREY7QUFFSkMsYUFBTztBQUZILEtBVEk7QUFhVkcsWUFBUTtBQUNOTCxZQUFNQyxNQURBO0FBRU5DLGFBQU87QUFGRCxLQWJFO0FBaUJWSSxjQUFVO0FBQ1JOLFlBQU1DLE1BREU7QUFFUkMsYUFBTztBQUZDLEtBakJBO0FBcUJWSyxhQUFTO0FBQ1BQLFlBQU1DLE1BREM7QUFFUEMsYUFBTztBQUZBLEtBckJDO0FBeUJWTSxnQkFBWTtBQUNWUixZQUFNLENBQUNHLE1BQUQsRUFBU0YsTUFBVCxDQURJO0FBRVZDLGFBQU87QUFGRztBQXpCRixHO0FBOEJaTyxRQUFNLEU7QUFDTkMsV0FBUyxFO0FBQ1RDLFlBQVUsb0JBQVk7O0FBRXBCLFFBQUksS0FBS0YsSUFBTCxDQUFVUCxLQUFkLEVBQXFCO0FBQ25CLFVBQUlBLFFBQVEsS0FBS08sSUFBTCxDQUFVUCxLQUF0Qjs7QUFFQSxjQUFRLEtBQUtPLElBQUwsQ0FBVUYsT0FBbEI7O0FBRUU7QUFDQSxhQUFLLEdBQUw7QUFBVTtBQUNSTCxvQkFBUWxCLFdBQVcsS0FBS3lCLElBQUwsQ0FBVVAsS0FBckIsRUFBNEIsQ0FBNUIsQ0FBUjtBQUNBO0FBQ0Q7O0FBRUQ7QUFDQSxhQUFLLE1BQUw7QUFBYTtBQUNYQSxvQkFBUWIsU0FBUyxLQUFLb0IsSUFBTCxDQUFVUCxLQUFuQixDQUFSO0FBQ0E7QUFDRDs7QUFFRDtBQUNBLGFBQUssT0FBTDtBQUFjO0FBQ1pBLG9CQUFRYixTQUFTLEtBQUtvQixJQUFMLENBQVVQLEtBQW5CLEVBQTBCWCxRQUExQixHQUFxQ3FCLElBQXJDLEVBQVI7O0FBRUEsaUJBQUtDLE9BQUwsQ0FBYTtBQUNYTCwwQkFBWSxDQUFDLEtBQUtDLElBQUwsQ0FBVVAsS0FBVixDQUFnQlgsUUFBaEIsR0FBMkJDLEtBQTNCLENBQWlDLEdBQWpDLEVBQXNDLENBQXRDLEtBQTRDLElBQTdDLEVBQW1Eb0IsSUFBbkQ7QUFERCxhQUFiO0FBR0E7QUFDRDtBQUNEO0FBQVM7QUFDTFYsb0JBQVFsQixXQUFXLEtBQUt5QixJQUFMLENBQVVQLEtBQXJCLEVBQTRCLENBQTVCLENBQVI7QUFDQTtBQUNIOztBQTFCSDs7QUE4QkEsV0FBS1csT0FBTCxDQUFhO0FBQ1hYLGVBQU9BO0FBREksT0FBYjtBQUdEO0FBQ0YiLCJmaWxlIjoiaW5kZXgud3hjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gICAqIOWwj+aVsOS/neeVmeWkhOeQhlxuICAgKiBAcGFyYW0gcHJpY2VOdW0g5Lu35qC85pWw5a2X77yI5Y2V5L2N5YWD77yJXG4gICAqIEBwYXJhbSBsZW4g5L+d55WZ55qE5bCP5pWw6ZW/5bqmXG4gICAqIEBwYXJhbSBkaXIg5Y+W5pW05pa55ZCR77yMZiAoZmxvb3IpIOS4uuWQkeS4i+WPluaVtO+8jOm7mOiupOWAvO+8m2PvvIhjZWlsaW5n77yJ5Li65ZCR5LiK5Y+W5pW0XG4gICAqL1xuICBmdW5jdGlvbiBnZXREZWNpbWFsKHByaWNlTnVtLCBsZW4sIGRpcikge1xuICAgIGlmICghcHJpY2VOdW0gfHwgIWxlbikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGRpciA9IGRpciB8fCAnZic7XG4gICAgcHJpY2VOdW0gPSBwYXJzZUZsb2F0KHByaWNlTnVtLCAxMCk7XG4gICAgbGVuID0gcGFyc2VJbnQobGVuLCAxMCk7XG5cbiAgICBpZiAoZGlyID09PSAnZicpIHtcbiAgICAgIGxldCBpbnROdW1TdHIgPSBwcmljZU51bS50b1N0cmluZygpLnNwbGl0KCcuJylbMF07XG4gICAgICBsZXQgZGVjaW1hbE51bVN0ciA9IHByaWNlTnVtLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVsxXSB8fCAnMDAnO1xuICAgICAgaWYgKGRlY2ltYWxOdW1TdHIubGVuZ3RoIDwgMikge1xuICAgICAgICAgIGRlY2ltYWxOdW1TdHIgKz0gJzAnXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpbnROdW1TdHIgKyAnLicgKyBkZWNpbWFsTnVtU3RyLnN1YnN0cmluZygwLCBsZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcHJpY2VOdW0udG9GaXhlZChsZW4pO1xuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBkZWZhdWx0IHtcbiAgICBjb25maWc6IHtcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge31cbiAgICB9LFxuICAgIGJlaGF2aW9yczogW10sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgc3ltYm9sOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgdmFsdWU6ICfvv6UnXG4gICAgICB9LFxuICAgICAgdmFsdWU6IHtcbiAgICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgICAgdmFsdWU6ICcnXG4gICAgICB9LFxuICAgICAgaWNvbjoge1xuICAgICAgICB0eXBlOiBbU3RyaW5nXSxcbiAgICAgICAgdmFsdWU6ICcnXG4gICAgICB9LFxuICAgICAgc3RhdHVzOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgdmFsdWU6ICcnXG4gICAgICB9LFxuICAgICAgZGVsQ29sb3I6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICB2YWx1ZTogJyM5OTknXG4gICAgICB9LFxuICAgICAgZGVjaW1hbDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIHZhbHVlOiAnMidcbiAgICAgIH0sXG4gICAgICBkZWNpbWFsTnVtOiB7XG4gICAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICAgIHZhbHVlOiAnJ1xuICAgICAgfVxuICAgIH0sXG4gICAgZGF0YToge30sXG4gICAgbWV0aG9kczoge30sXG4gICAgYXR0YWNoZWQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgaWYgKHRoaXMuZGF0YS52YWx1ZSkge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmRhdGEudmFsdWU7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLmRhdGEuZGVjaW1hbCkge1xuXG4gICAgICAgICAgLy8g5L+d55WZ5LiA5L2N5bCP5pWwXG4gICAgICAgICAgY2FzZSAnMSc6IHtcbiAgICAgICAgICAgIHZhbHVlID0gZ2V0RGVjaW1hbCh0aGlzLmRhdGEudmFsdWUsIDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8g5Y+q5pi+56S65pW05pWwXG4gICAgICAgICAgY2FzZSAnbm9uZSc6IHtcbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VJbnQodGhpcy5kYXRhLnZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIOWwj+aVsOmDqOWIhue8qeWwj1xuICAgICAgICAgIGNhc2UgJ3NtYWxsJzoge1xuICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUludCh0aGlzLmRhdGEudmFsdWUpLnRvU3RyaW5nKCkudHJpbSgpO1xuXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICBkZWNpbWFsTnVtOiAodGhpcy5kYXRhLnZhbHVlLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVsxXSB8fCAnMDAnKS50cmltKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICB2YWx1ZSA9IGdldERlY2ltYWwodGhpcy5kYXRhLnZhbHVlLCAyKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0iXX0=