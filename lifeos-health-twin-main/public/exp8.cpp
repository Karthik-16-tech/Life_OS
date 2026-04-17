#include<bits/stdc++.h>
using namespace std;
const int MAX = 1e4 + 5;
int id[MAX], rank_arr[MAX], nodes, edges;
pair<long long, pair<int, int>> p[MAX];

void initialize() {
    for(int i = 0; i < MAX; i++) {
        id[i] = i;
        rank_arr[i] = 0;
    }
}

int root(int x) {
    if(id[x] != x)
        id[x] = root(id[x]);  // Path compression (recursive version)
    return id[x];
}

void union1(int x, int y) {
    int p = root(x);
    int q = root(y);
    if(p == q) return;
    
    if(rank_arr[p] < rank_arr[q])
        id[p] = q;
    else if(rank_arr[p] > rank_arr[q])
        id[q] = p;
    else {
        id[q] = p;
        rank_arr[p]++;
    }
}

long long kruskal(pair<long long, pair<int, int>> p[]) {
    long long minimumCost = 0;
    for(int i = 0; i < edges; i++) {
        int x = p[i].second.first;
        int y = p[i].second.second;
        long long cost = p[i].first;
        
        if(root(x) != root(y)) {
            minimumCost += cost;
            union1(x, y);
        }
    }
    return minimumCost;
}

int main() {
    initialize();
    cin >> nodes >> edges;
    
    for(int i = 0; i < edges; i++) {
        int x, y;
        long long weight;
        cin >> x >> y >> weight;
        p[i] = {weight, {x, y}};
    }
    
    sort(p, p + edges);
    cout << kruskal(p) << endl;
    
    return 0;
}