// Enhanced Tickets JS Functions

// Function to modify pagination and layout to match reference design
$(document).ready(function() {
    // Apply style changes when DataTable is initialized
    $(document).on('init.dt', function(e, settings) {
        var api = new $.fn.dataTable.Api(settings);
        var tableId = $(api.table().node()).attr('id');
        
        if (!$(api.table().node()).hasClass('enhanced')) {
            // Add class to mark as enhanced
            $(api.table().node()).addClass('enhanced');
            
            // Replace the text of Previous/Next with arrows
            $('.paginate_button.previous').html('&larr;').attr('title', 'Previous');
            $('.paginate_button.next').html('&rarr;').attr('title', 'Next');
            
            // Remove any explicit width on table columns
            $('#' + tableId + ' th').css('width', '');
            
            // Enhance ticket title links
            $('#' + tableId + ' a[href*="tickets"]').addClass('ticket-link');
            
            // Add styling classes to ticket status
            $('#' + tableId + ' td').each(function() {
                var text = $(this).text().trim();
                if (text === 'Open') {
                    $(this).html('<span class="ticket-status status-open">Open</span>');
                } else if (text === 'Closed') {
                    $(this).html('<span class="ticket-status status-closed">Closed</span>');
                } else if (text === 'Resolved') {
                    $(this).html('<span class="ticket-status status-resolved">Resolved</span>');
                } else if (text === 'Reopened') {
                    $(this).html('<span class="ticket-status status-open">Reopened</span>');
                } else if (text === 'In Progress') {
                    $(this).html('<span class="ticket-status status-in-progress">In Progress</span>');
                }
            });

            // Ensure the table header has the right styling
            $('#' + tableId + ' thead th').css({
                'background-color': '#183b6b',
                'color': '#ffffff'
            });
            
            // Adjust controls layout to match reference image
            setTimeout(function() {
                // Get wrapper elements
                var wrapper = $('#' + tableId + '_wrapper');
                
                // Get column visibility button
                var columnVisibilityBtn = wrapper.find('.dt-buttons');
                
                // Find the pagination and length controls
                var lengthDiv = wrapper.find('.dataTables_length');
                var paginationDiv = wrapper.find('.dataTables_paginate');
                
                // Create a container for the controls
                var controlsContainer = $('<div class="dt-controls" style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;"></div>');
                
                // Left side for Show entries
                var leftControls = $('<div class="entries-control" style="display: flex; align-items: center;"></div>');
                leftControls.append('Show ').append(lengthDiv.find('select').clone()).append(' entries');
                
                // Right side for pagination and column visibility
                var rightControls = $('<div class="pagination-controls" style="display: flex; align-items: center;"></div>');
                
                // Move column visibility button if it exists
                if (columnVisibilityBtn.length) {
                    // Clone the button to avoid moving the original
                    var visButton = columnVisibilityBtn.clone(true);
                    visButton.find('button').addClass('btn btn-sm btn-outline-secondary').css({
                        'margin-right': '10px',
                        'font-size': '12px',
                        'padding': '4px 8px'
                    });
                    rightControls.append(visButton);
                }
                
                // Add pagination to the right side
                rightControls.append(paginationDiv.clone(true));
                
                // Add both sides to the container
                controlsContainer.append(leftControls);
                controlsContainer.append(rightControls);
                
                // Remove any existing pagination wrappers
                wrapper.find('.pagination-wrapper, .dt-controls').remove();
                
                // Place our container at the bottom of the wrapper
                wrapper.append(controlsContainer);
                
                // Clean up the original controls that we've moved
                lengthDiv.hide();
                paginationDiv.hide(); // Hide the original pagination controls
                
                // Enhance pagination styling - use our custom CSS classes instead of Bootstrap buttons
                wrapper.find('.paginate_button').removeClass('btn btn-sm btn-primary btn-outline-secondary');
                
                // Make sure the entries control is properly styled
                $('.entries-control select').addClass('form-control-sm');
                
                // Hide pagination elements to remove pagination UI
                wrapper.find('.dataTables_paginate').hide();
                wrapper.find('.entries-control').hide();
                wrapper.find('.dt-controls').hide();
                wrapper.find('.dataTables_length').hide();
                wrapper.find('.dataTables_info').hide();
                
            }, 100); // Small delay to ensure all elements are ready
        }
    });
});
