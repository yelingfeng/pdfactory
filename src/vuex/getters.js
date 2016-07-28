export function isLoadSuccess (state) {
   let comp = state.app.globalData.components;
   comp = comp == undefined ? 0 : comp;
   return state.app.loadedCompNum == comp.length ;
}