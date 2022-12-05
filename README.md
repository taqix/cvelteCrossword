# svelte-crossword
###### Robisz tak pobierasz se gita stąd jak nie masz [git](https://git-scm.com/download/win)
## Napisz jak to zrobisz, bo będę musiał dać Ci dostęp do zmieniania plików i trzeba zrobić krótki setup gita
Tym sobie pobierasz projekt cały
```
git pull https://github.com/taqix/svelte-crossword
```
Zawsze gdy będziemy wymieniać się rzeczami no to będziesz musiał tą komendę użyć, tego używasz jak chcesz dodać coś do swojego brancha
```
git add --all
git commit -m "tu dajesz nazwe commitu"
git push
```
Za pierwszym razem ta ostatnia komenda nie zadziała i musisz użyć tego całego
```
git remote add origin https://github.com/taqix/svelte-crossword.git
git branch -M main
git push -u origin main
```
