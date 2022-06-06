<template>
    <div class="main">
        <div class="topInfo">
            <p class="time">13:20</p>
            <h1 class="area">광진구 능동</h1>
            <img src="@/assets/img/icons/w1.png"/>
            <h1 class="temperature">31도</h1>
            <p class="otherTemperature">어제보다 1도 낮아요</p>
        </div>
        <div class="otherInfo">
            <div class="fl">
                <div>
                    <span class="title">미세먼지</span>
                    <span>나쁨</span>
                </div>
                <div>
                    <span class="title">강수확률</span>
                    <span>40%</span>
                </div>
            </div>
            <div class="fl">
                <div>
                    <span class="title">습도</span>
                    <span>나쁨</span>
                </div>
                <div>
                    <span class="title">풍속</span>
                    <span>1.3m/s</span>
                </div>
            </div>
        </div>
        <div class="bottomInfo">
            <div class="bottomNav">
                <ul>
                    <li class="active">시간대별</li>
                    <li>주간예보</li>
                    <li>전국날씨</li>
                </ul>
            </div>
            <div class="bottom">
                <!-- <div class="timeInfo">
                    <div class="timeInfoWrap">
                        <ul>
                            <li>
                                <p>06/02</p>
                                <h1>14시</h1>
                                <img src="@/assets/img/icons/w2.png"/>
                            </li>
                             <li>
                                <p>06/02</p>
                                <h1>14시</h1>
                                <img src="@/assets/img/icons/w2.png"/>
                            </li>
                             <li>
                                <p>06/02</p>
                                <h1>14시</h1>
                                <img src="@/assets/img/icons/w2.png"/>
                            </li>
                        </ul>
                    </div>
                </div> -->
                
                <!-- <div class="timeInfo weak">
                    <div class="timeInfoWrap">
                        <ul>
                            <li>
                                <p>06/02</p>
                                <h1>월</h1>
                                <img src="@/assets/img/icons/w2.png"/>
                                <div class="weakTemperature">
                                    <div>
                                        <h1>최고</h1>
                                    </div>
                                    <div>
                                        <p>24도</p>
                                    </div>
                                </div>
                                <div class="weakTemperature">
                                    <div>
                                        <h1>최저</h1>
                                    </div>
                                    <div>
                                        <p>24도</p>
                                    </div>
                                </div>
                            </li>
                             <li>
                                <p>06/02</p>
                                <h1>화</h1>
                                <img src="@/assets/img/icons/w2.png"/>
                                <div class="weakTemperature">
                                    <div>
                                        <h1>최고</h1>
                                    </div>
                                    <div>
                                        <p>24도</p>
                                    </div>
                                </div>
                                <div class="weakTemperature">
                                    <div>
                                        <h1>최저</h1>
                                    </div>
                                    <div>
                                        <p>24도</p>
                                    </div>
                                </div>
                            </li>
                             <li>
                                <p>06/02</p>
                                <h1>수</h1>
                                <img src="@/assets/img/icons/w2.png"/>
                                <div class="weakTemperature">
                                    <div>
                                        <h1>최고</h1>
                                    </div>
                                    <div>
                                        <p>24도</p>
                                    </div>
                                </div>
                                <div class="weakTemperature">
                                    <div>
                                        <h1>최저</h1>
                                    </div>
                                    <div>
                                        <p>24도</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div> -->
                <div class="mapInfo">
                    <div class="mapInfoWrap">
                        <img src="@/assets/img/map.png" class="map"/>
                        <div class="mapItem">
                            <p>서울</p>
                            <img src="@/assets/img/icons/w2.png"/>
                            <p>26도</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name : "mainPage"
}
// parent:after{content:'';display:block;clear:both;}
</script>
