angular.module('app-welcome').controller('WelcomeCtrl', function($scope, $interval){

	$scope.inputDate = {
            year: 2014,
            month: 3,
            day: 1
        }

        $scope.remainDate = {
            day: '000',
            hour: '00',
            minute: '00',
            second: '00'
        }

        // 进入倒计时
        $scope.launch = function () {
            var timer = $interval(function(){
                if(updateTime() == 0) {
                    alert('倒计时已经完成！');
                    $interval.cancel(timer);
                }
            }, 1000);
            updateTime();
        }

        /**
         * 更新倒计时时间
         */
        function updateTime () {
            var time = countDown(2014, 9, 26);
            if(time != 0) {
                $scope.remainDate.day = time.day;
                $scope.remainDate.hour = time.hour;
                $scope.remainDate.minute = time.minute;
                $scope.remainDate.second = time.second;
                return 1;
            } else {
                return 0;
            }
        }


        /**
     * 生成倒计时时间
     *
     * @param endYear
     * @param endMonth
     * @param endDay
     * @returns {number} or {}
     */
    function countDown (endYear, endMonth, endDay) {
        // 生成结束时间
        // 时分秒归零 为了设置时分秒为当日的临界点，例如2014-2-9 0:0:0
        var dateEnd = new Date();
        dateEnd.setFullYear(endYear);
        dateEnd.setMonth(endMonth - 1);
        dateEnd.setDate(endDay);
        dateEnd.setHours(20);
        dateEnd.setMinutes(0);
        dateEnd.setSeconds(0);

        // 获取相差秒数
        // 除以1000获取秒数而非毫秒数
        var dateNow = new Date();
        var iRemain = (dateEnd.getTime() - dateNow.getTime()) / 1000;

        // 如果时间不足够倒计时，退出并返回0
        // 否则返回剩余时间
        if(iRemain < 0) {
            return 0;
        } else {
            var endDate = {};
            endDate.day = fillZero(iRemain / 86400, 3);
            iRemain %= 86400;

            endDate.hour = fillZero(iRemain / 3600, 2);
            iRemain %= 3600;

            endDate.minute = fillZero(iRemain / 60, 2);
            iRemain %= 60;

            endDate.second = fillZero(iRemain, 2);

            return endDate;
        }
    }

    /**
     * 为数字填充0
     *
     * @param num
     * @param digit
     * @returns {string}
     */
    function fillZero (num, digit) {
        var str = '' + parseInt(num);
        while(digit > str.length) {
            str = '0' + str;
        }

        return str;
    }

    $scope.launch();
});