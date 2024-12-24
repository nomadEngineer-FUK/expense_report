<template>
    <div class="sidebar">
        <div class="sidebar-header">
            <p>経費精算</p>
        </div>
        <nav class="sidebar-nav">
            <ul class="nav-list">
                <li class="nav-item">
                    <nuxt-link to="/" class="nav-link">
                        home
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link to="/expense-report" class="nav-link">
                        申請する
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link to="/" class="nav-link">
                        申請履歴
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link to="/" class="nav-link">
                        承認する
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link to="/" class="nav-link">
                        申請一覧
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link to="/" class="nav-link">
                        プロフィール
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link to="/" class="nav-link">
                        アカウント一覧
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link to="/" class="nav-link">
                        設定
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link to="/" class="nav-link">
                        FAQ
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link to="/" class="nav-link">
                        ログアウト
                    </nuxt-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.sidebar {
    /* width: 200px; */
    width: 12%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    padding: 1rem;
    overflow: hidden;
    background-color: #e1edf9;
}
.sidebar-header {
    border-bottom: 1px solid #ddd;
    padding: 1rem 0 0.6rem;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
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
