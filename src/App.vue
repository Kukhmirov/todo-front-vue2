<template>
    <div id="main">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <router-link to="/" class="navbar-brand">Kukhmirov To-Do</router-link>
            <div class="navbar-nav mr-auto">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/add" class="nav-link">Добавить задачу</router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container mt-3">
            <router-view />
        </div>
    </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss" src="./assets/style/index.scss"/>
