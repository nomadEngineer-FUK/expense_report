<template>
    <div class="sidebar">
        <div class="sidebar-header">
            <!-- <p>経費精算</p> -->
            <NuxtLink to="/" class="header-link">
                経費精算
            </NuxtLink>
        </div>
        <nav class="sidebar-nav">
            <ul class="nav-list">
                <li class="nav-item">
                    <NuxtLink to="/expense-report" class="nav-link">
                        申請する
                    </NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/expense-report/history" class="nav-link">
                        申請履歴
                    </NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/" class="nav-link">
                        承認する
                    </NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/" class="nav-link">
                        申請一覧
                    </NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/" class="nav-link">
                        プロフィール
                    </NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/" class="nav-link">
                        アカウント一覧
                    </NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/" class="nav-link">
                        設定
                    </NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/" class="nav-link">
                        FAQ
                    </NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/" class="nav-link">
                        ログアウト
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.sidebar {
    width: 12%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    padding: 1rem;
    overflow: hidden;
    background-color: #e1edf9;
    z-index: 100;
}
.sidebar-header {
    border-bottom: 1px solid #ddd;
    padding: 1rem 0 0.6rem;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
}
.header-link {
    text-decoration: none;
    font-size: large;
    color: #333;
}

.sidebar-nav {
    margin-top: 1.8rem;
    text-align: center;
}
.nav-list {
    list-style: none;
    padding: 0;
}
.nav-item {
    padding: 1.6rem 0;
    height: 100%;
    position: relative;
}
.nav-item:hover {
    background-color: #c3dcf4e5;
    transition: 0.3s;
    border-radius: 0.4rem;
}
.nav-link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #333;
}
</style>
