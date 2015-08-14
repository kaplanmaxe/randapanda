GARecordPage = function(pageLocation) {
  ga('create', 'UA-65972545-1', 'auto');
  ga('send', 'pageview', {
    page: pageLocation
  });
}